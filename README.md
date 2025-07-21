# Azure Communication Services OpenAI Calling Sample

This sample is a web application that demonstrates how to integrate Azure Communication Services calling with Azure OpenAI for real-time AI agent interaction during a live call.

## Features

- **Real-time AI Agent**: Connects a live call to an AI agent powered by Azure OpenAI for intelligent, real-time responses.
- **Advanced Call Automation**: Uses the Azure Communication Services [Call Automation SDK](https://learn.microsoft.com/azure/communication-services/concepts/call-automation/call-automation) to manage call flows and media streaming.
- **Live Status Updates**: Leverages Server-Sent Events (SSE) to push real-time status updates (e.g., "Agent is connected") from the server to the client.
-**Modern UI**: A responsive and mobile-friendly user interface built with React and Fluent UI.
- **Open Source & Customizable**: The app is fully customizable, allowing you to adapt the AI agent's behavior and the UI to your needs.

## Code Structure

- **/client**: Frontend client application built with React and TypeScript.
- **/server**: Backend server application built with Node.js and Express.
- **/deploy**: ARM templates (`azuredeploy.json`, `createUiDefinition.json`) for easy deployment to Azure.

## Local Setup

### Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/).
- An active Communication Services resource. [Create a Communication Services resource](https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource).
- An active Azure OpenAI resource with a model deployed (e.g., `gpt-4o-realtime-preview` `gpt-4o-mini-realtime-preview`).
- [Node.js (22.0.0 and above)](https://nodejs.org/en/download/)
- The `rt-client` package, which is required for real-time audio processin from the [aoai-realtime-audio-sdk releases page](https://github.com/Azure-Samples/aoai-realtime-audio-sdk/).
- For local development, Azure Dev Tunnels. For details, see [Enable dev tunnel](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started).


### Install Dependencies

Run `npm run setup` from both the `\` root folder to install the dependencies for each project.

```bash
npm run setup

```

### Setup and Run

For local development, you can run the client and server processes in one terminal in the root folder.
However, for the server callbacks you will need to host/share local web services through persistent endpoint
like Azure DevTunnels. For details, see [Enable dev tunnel](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started).

1. **Setup and hose your Azure DevTunnel**
    [Azure DevTunnels](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/overview) is an Azure service that enables you to share local web services hosted on the internet. Use the commands to connect your local development environment to the public internet. This creates a tunnel with a persistent endpoint URL and which allows anonymous access. We use this endpoint to notify your application of calling events from the ACS Call Automation service.

    ```bash
    devtunnel create --allow-anonymous
    devtunnel port create -p 8080
    devtunnel host
    ```

1.  **Start the sample:**
    The client development server will run on port 3000 and proxy API requests to the server on port 8080.

    ```bash
    npm run start:dev
    ```

### Environment Variables

For local development, create a `.env` file in the `/server` directory. You can use the `.env.example` file as a template.

The following environment variables are required:

-   `RESOURCE_CONNECTION_STRING`: Your [Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp) connection string.
-   `ENDPOINT_URL`: The endpoint URL for your [Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp) resource.
-   `AZURE_OPENAI_SERVICE_KEY`: The API key for your Azure OpenAI service. See [instructions](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/create-resource?pivots=web-portal)
-   `AZURE_OPENAI_SERVICE_ENDPOINT`: The endpoint for your Azure OpenAI service.
-   `AZURE_OPENAI_SERVICE_DEPLOYMENT_MODEL_NAME`: The name of your [deployed OpenAI model](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions#model-summary-table-and-region-availability). i.e. gpt-4o-realtime-preview, gpt-4o-mini-realtime-preview
-   `AZURE_OPENAI_PROMPT_INSTRUCTIONS`: The system prompt/instructions for the Azure OpenAI assistant. If not provided, a default prompt will be used.
-   `SERVER_CALLBACK_URI`: The publicly accessible URL for your server, used for Call Automation callbacks. For local development, you can use a tunneling service like [Azure Devtunnels](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started?tabs=macos).

When you deploy to Azure using the "Deploy to Azure" button, these values will be configured for you in the App Service application settings.


## Trademark

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft’s Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general). Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.