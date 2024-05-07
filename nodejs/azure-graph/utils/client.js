// https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/a7af35559d90d9955fffe17f4ac65eb46dcda471/docs/AuthCodeMSALBrowserAuthenticationProvider.md

const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
const {
  TokenCredentialAuthenticationProvider,
} = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");

const config = require("./config.json");

function getClient() {
    // Create an instance of the TokenCredential class that is imported
    const credential = new ClientSecretCredential(
      config.tenantId,
      config.clientId,
      config.clientSecret
    );
  
    // Set your scopes and options for TokenCredential.getToken (Check the ` interface GetTokenOptions` in (TokenCredential Implementation)[https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-auth/src/tokenCredential.ts])
  
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: config.scopes,
    });
  
    const client = Client.initWithMiddleware({
      debugLogging: true,
      authProvider,
    });
  
    return client;
  }
  
module.exports = {
    getClient
}
 