import React from "react";
import ApiSetting from "./ApiSetting";
import Collapsible from "./Collapsible";

interface ApiSettingsProps {
  openAIApiKey: string;
  setOpenAIApiKey: (value: string) => void;
  openAIOrgId: string;
  setOpenAIOrgId: (value: string) => void;
  googleApiKey: string;
  setGoogleApiKey: (value: string) => void;
  anthropicApiKey: string;
  setAnthropicApiKey: (value: string) => void;
  openRouterAiApiKey: string;
  setOpenRouterAiApiKey: (value: string) => void;
  azureOpenAIApiKey: string;
  setAzureOpenAIApiKey: (value: string) => void;
  azureOpenAIApiInstanceName: string;
  setAzureOpenAIApiInstanceName: (value: string) => void;
  azureOpenAIApiDeploymentName: string;
  setAzureOpenAIApiDeploymentName: (value: string) => void;
  azureOpenAIApiVersion: string;
  setAzureOpenAIApiVersion: (value: string) => void;
  azureOpenAIApiEmbeddingDeploymentName: string;
  setAzureOpenAIApiEmbeddingDeploymentName: (value: string) => void;
  amazonBedrockApiKey: string;
  setAmazonBedrockApiKey: (value: string) => void;
  amazonBedrockApiSecretKey: string;
  setAmazonBedrockApiSecretKey: (value: string) => void;
  amazonBedrockRegion: string;
  setAmazonBedrockRegion: (value: string) => void;
  groqApiKey: string;
  setGroqApiKey: (value: string) => void;
  cohereApiKey: string;
  setCohereApiKey: (value: string) => void;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({
  openAIApiKey,
  setOpenAIApiKey,
  openAIOrgId,
  setOpenAIOrgId,
  googleApiKey,
  setGoogleApiKey,
  anthropicApiKey,
  setAnthropicApiKey,
  openRouterAiApiKey,
  setOpenRouterAiApiKey,
  azureOpenAIApiKey,
  setAzureOpenAIApiKey,
  azureOpenAIApiInstanceName,
  setAzureOpenAIApiInstanceName,
  azureOpenAIApiDeploymentName,
  setAzureOpenAIApiDeploymentName,
  azureOpenAIApiVersion,
  setAzureOpenAIApiVersion,
  azureOpenAIApiEmbeddingDeploymentName,
  setAzureOpenAIApiEmbeddingDeploymentName,
  amazonBedrockApiKey,
  setAmazonBedrockApiKey,
  amazonBedrockApiSecretKey,
  setAmazonBedrockApiSecretKey,
  amazonBedrockRegion,
  setAmazonBedrockRegion,
  groqApiKey,
  setGroqApiKey,
  cohereApiKey,
  setCohereApiKey,
}) => {
  return (
    <div>
      <br />
      <br />
      <h1>API Settings</h1>
      <p>All your API keys are stored locally.</p>
      <div className="warning-message">
        Make sure you have access to the model and the correct API key.
        <br />
        If errors occur, please re-enter the API key, save and reload the plugin to see if it
        resolves the issue.
      </div>
      <div>
        <div>
          <ApiSetting
            title="OpenAI API Key"
            value={openAIApiKey}
            setValue={setOpenAIApiKey}
            placeholder="Enter OpenAI API Key"
          />
          <p>
            You can find your API key at{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://platform.openai.com/api-keys
            </a>
          </p>
          <ApiSetting
            title="OpenAI Organization ID (optional)"
            value={openAIOrgId}
            setValue={setOpenAIOrgId}
            placeholder="Enter OpenAI Organization ID if applicable"
          />
        </div>
        <div className="warning-message">
          <span>If you are a new user, try </span>
          <a
            href="https://platform.openai.com/playground?mode=chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI playground
          </a>
          <span> to see if you have correct API access first.</span>
        </div>
      </div>
      <br />
      <Collapsible title="Google API Settings">
        <div>
          <ApiSetting
            title="Google API Key"
            value={googleApiKey}
            setValue={setGoogleApiKey}
            placeholder="Enter Google API Key"
          />
          <p>
            If you have Google Cloud, you can get Gemini API key{" "}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
            <br />
            Your API key is stored locally and is only used to make requests to Google's services.
          </p>
        </div>
      </Collapsible>

      <Collapsible title="Anthropic API Settings">
        <div>
          <ApiSetting
            title="Anthropic API Key"
            value={anthropicApiKey}
            setValue={setAnthropicApiKey}
            placeholder="Enter Anthropic API Key"
          />
          <p>
            If you have Anthropic API access, you can get the API key{" "}
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
            <br />
            Your API key is stored locally and is only used to make requests to Anthropic's
            services.
          </p>
        </div>
      </Collapsible>

      <Collapsible title="OpenRouter.ai API Settings">
        <div>
          <ApiSetting
            title="OpenRouter AI API Key"
            value={openRouterAiApiKey}
            setValue={setOpenRouterAiApiKey}
            placeholder="Enter OpenRouter AI API Key"
          />
          <p>
            You can get your OpenRouterAI key{" "}
            <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
            <br />
            Find models{" "}
            <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </p>
        </div>
      </Collapsible>

      <Collapsible title="Azure OpenAI API Settings">
        <div>
          <ApiSetting
            title="Azure OpenAI API Key"
            value={azureOpenAIApiKey}
            setValue={setAzureOpenAIApiKey}
            placeholder="Enter Azure OpenAI API Key"
          />
          <ApiSetting
            title="Azure OpenAI API Instance Name"
            value={azureOpenAIApiInstanceName}
            setValue={setAzureOpenAIApiInstanceName}
            placeholder="Enter Azure OpenAI API Instance Name"
            type="text"
          />
          <ApiSetting
            title="Azure OpenAI API Deployment Name"
            description="This is your actual model, no need to pass a model name separately."
            value={azureOpenAIApiDeploymentName}
            setValue={setAzureOpenAIApiDeploymentName}
            placeholder="Enter Azure OpenAI API Deployment Name"
            type="text"
          />
          <ApiSetting
            title="Azure OpenAI API Version"
            value={azureOpenAIApiVersion}
            setValue={setAzureOpenAIApiVersion}
            placeholder="Enter Azure OpenAI API Version"
            type="text"
          />
          <ApiSetting
            title="Azure OpenAI API Embedding Deployment Name"
            description="(Optional) For embedding provider Azure OpenAI"
            value={azureOpenAIApiEmbeddingDeploymentName}
            setValue={setAzureOpenAIApiEmbeddingDeploymentName}
            placeholder="Enter Azure OpenAI API Embedding Deployment Name"
            type="text"
          />
        </div>
      </Collapsible>

      <Collapsible title="Amazon Bedrock API Settings">
        <div>
          <ApiSetting
            title="Amazon Bedrock API Key"
            value={amazonBedrockApiKey}
            setValue={setAmazonBedrockApiKey}
            placeholder="Enter Amazon Bedrock API Key"
          />
          <ApiSetting
            title="Amazon Bedrock API Secret Key"
            value={amazonBedrockApiSecretKey}
            setValue={setAmazonBedrockApiSecretKey}
            placeholder="Enter Amazon Bedrock API Secret Key"
          />
          <ApiSetting
            title="Amazon Bedrock Region"
            value={amazonBedrockRegion}
            setValue={setAmazonBedrockRegion}
            placeholder="Enter Amazon Bedrock Region"
            type="text"
          />
        </div>
      </Collapsible>

      <Collapsible title="Groq API Settings">
        <div>
          <ApiSetting
            title="Groq API Key"
            value={groqApiKey}
            setValue={setGroqApiKey}
            placeholder="Enter Groq API Key"
          />
          <p>
            If you have Groq API access, you can get the API key{" "}
            <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
            <br />
            Your API key is stored locally and is only used to make requests to Groq's services.
          </p>
        </div>
      </Collapsible>

      <Collapsible title="Cohere API Settings">
        <ApiSetting
          title="Cohere API Key"
          value={cohereApiKey}
          setValue={setCohereApiKey}
          placeholder="Enter Cohere API Key"
        />
        <p>
          Get your free Cohere API key{" "}
          <a href="https://dashboard.cohere.ai/api-keys" target="_blank" rel="noreferrer">
            here
          </a>
        </p>
      </Collapsible>
    </div>
  );
};

export default ApiSettings;
