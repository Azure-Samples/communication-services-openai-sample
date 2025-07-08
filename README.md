# Azure Communication Services OpenAI Calling Sample

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure-Samples%2Fcommunication-services-openai-sample%2Fmain%2Fdeploy%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure-Samples%2Fcommunication-services-openai-sample%2Fmain%2Fdeploy%2FcreateUiDefinition.json)


This sample is a web application that demonstrates how to integrate Azure Communication Services calling with Azure OpenAI for real-time AI agent interaction during a live call.

## Features

- **Real-time AI Agent**: Connects a live call to an AI agent powered by Azure OpenAI for intelligent, real-time responses.
- **Advanced Call Automation**: Uses the Azure Communication Services [Call Automation SDK](https://learn.microsoft.com/azure/communication-services/concepts/call-automation/call-automation) to manage call flows and media streaming.
- **Live Status Updates**: Leverages Server-Sent Events (SSE) to push real-time status updates (e.g., "Agent is connected") from the server to the client.
-**Modern UI**: A responsive and mobile-friendly user interface built with React and Fluent UI.
- **One-Click Deployment**: Includes an ARM template to quickly deploy all required Azure resources.
- **Open Source & Customizable**: The app is fully customizable, allowing you to adapt the AI agent's behavior and the UI to your needs.

## Code Structure

- **/client**: Frontend client application built with React and TypeScript.
- **/server**: Backend server application built with Node.js and Express.
- **/deploy**: ARM templates (`azuredeploy.json`, `createUiDefinition.json`) for easy deployment to Azure.

## Local Setup

### Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/).
- An active Communication Services resource. [Create a Communication Services resource](https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource).
- An active Azure OpenAI resource with a model deployed (e.g., `gpt-4o-realtime-preview`).
- [Node.js (20.0.0 and above)](https://nodejs.org/en/download/)
- The `rt-client` package, which is required for real-time audio processin from the [aoai-realtime-audio-sdk releases page](https://github.com/Azure-Samples/aoai-realtime-audio-sdk/).


### Install Dependencies

Run `npm run setup` from both the `\` root folder to install the dependencies for each project.

```bash
npm run setup

```

### Build and Run

For local development, you can run the client and server processes in one terminal in the root folder.

1.  **Build the sample:**
    The server will run on port 8080.

    ```bash
    npm run build
    ```

2.  **Start the sample:**
    The client development server will run on port 3000 and proxy API requests to the server on port 8080.

    ```bash
    npm run start:dev
    ```

### Environment Variables

For local development, create a `.env` file in the `/server` directory. You can use the `.env.example` file as a template.

The following environment variables are required:

-   `RESOURCE_CONNECTION_STRING`: Your Azure Communication Services connection string.
-   `ENDPOINT_URL`: The endpoint URL for your Communication Services resource.
-   `AZURE_OPENAI_SERVICE_KEY`: The API key for your Azure OpenAI service.
-   `AZURE_OPENAI_SERVICE_ENDPOINT`: The endpoint for your Azure OpenAI service.
-   `AZURE_OPENAI_SERVICE_DEPLOYMENT_MODEL_NAME`: The name of your deployed OpenAI model.
-   `SERVER_CALLBACK_URI`: The publicly accessible URL for your server, used for Call Automation callbacks. For local development, you can use a tunneling service like [ngrok](https://ngrok.com/) (`http://<your-ngrok-id>.ngrok.io`).
-   `SERVER_CALLBACK_URI_PORT`: The port for the callback URI (e.g., 8080).

When you deploy to Azure using the "Deploy to Azure" button, these values will be configured for you in the App Service application settings.

## Updating Your Sample

Once a new release is published, you can update your deployed app with the latest package using the [Azure CLI](https://docs.microsoft.com/cli/azure/webapp/deployment/source?view=azure-cli-latest#az_webapp_deployment_source_config_zip).

1.  Build the production package:
    ```bash
    npm run build:prod
    ```
2.  Deploy the zip file from the `dist` folder:
    ```shell
    az webapp deployment source config-zip --resource-group <your-resource-group> --name <your-app-name> --src dist/app.zip
    ```

## Trademark

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft’s Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general). Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party’s policies.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.