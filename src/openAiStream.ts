import { AI_SENDER, USER_SENDER } from '@/constants';
import { ChatMessage } from '@/sharedState';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';


export type Role = 'assistant' | 'user';

export interface OpenAiMessage {
  role: Role;
  content: string;
}

export interface OpenAiParams {
  model: string,
  key: string,
  temperature: number,
  maxTokens: number,
}

export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

export const OpenAIStream = async (
  model: string,
  key: string,
  messages: OpenAiMessage[],
  temperature: number,
  maxTokens: number,
  signal?: AbortSignal,
) => {
  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`,
      ...(process.env.OPENAI_ORGANIZATION && {
        'OpenAI-Organization': process.env.OPENAI_ORGANIZATION,
      }),
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant named Obsidian Copilot.',
        },
        ...messages,
      ],
      max_tokens: maxTokens,
      temperature: temperature,
      stream: true,
    }),
    signal,
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new OpenAIError(
        result.error.message,
        result.error.type,
        result.error.param,
        result.error.code,
      );
    } else {
      throw new Error(
        `OpenAI API returned an error: ${
          decoder.decode(result?.value) || result.statusText
        }`,
      );
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      if (!res.body) {
        throw new Error("Response body is null");
      }

      const reader = res.body.getReader();
      let done = false;
      let value;
      while (!done) {
        ({ done, value } = await reader.read());
        if (!done) parser.feed(decoder.decode(value));
      }
    },
  });

  return stream;
};

export const sendMessageToAIAndStreamResponse = async (
  userMessage: ChatMessage,
  chatContext: ChatMessage[],
  openAiParams: OpenAiParams,
  controller: AbortController | null,
  updateCurrentAiMessage: (message: string) => void,
  addMessage: (message: ChatMessage) => void,
) => {
  const {
    key,
    model,
    temperature,
    maxTokens,
  } = openAiParams;
  // Use OpenAIStream to send message to AI and get a response
  try {
    const stream = await OpenAIStream(
      model,
      key,
      [
        ...chatContext.map((chatMessage) => {
          return {
            role: chatMessage.sender === USER_SENDER
              ? 'user' as Role : 'assistant' as Role,
            content: chatMessage.message,
          };
        }),
        { role: 'user', content: userMessage.message },
      ],
      temperature,
      maxTokens,
      controller?.signal,
    );
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let aiResponse = '';

    reader.read().then(
      async function processStream({ done, value }): Promise<void> {
        if (done) {
          // Add the full AI response to the chat history
          const botMessage: ChatMessage = {
            message: aiResponse,
            sender: AI_SENDER,
          };
          addMessage(botMessage);
          updateCurrentAiMessage('');
          return;
        }

        // Accumulate the AI response
        aiResponse += decoder.decode(value);
        updateCurrentAiMessage(aiResponse);

        // Continue reading the stream
        return reader.read().then(processStream);
      },
    );
  } catch (error) {
    console.error('Error in OpenAIStream:', error);
  }
};