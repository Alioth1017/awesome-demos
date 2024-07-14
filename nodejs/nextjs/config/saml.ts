// import fs from "fs";

// export const samlConfig = {
//   // entryPoint: 'your-saml-entry-point',
//   // issuer: 'your-saml-issuer',
//   // callbackUrl: 'http://localhost:3000/auth/callback', // Adjust the callback URL as per your setup
//   // cert: 'your-saml-certificate'
//   entryPoint: process.env.SAML_ENTRY_POINT as string,
//   issuer: "your-issuer",
//   callbackUrl: process.env.SAML_CALLBACK_URL as string,
//   cert: fs.readFileSync(process.env.SAML_CERT_PATH as string, "utf-8"),
// };
// export const samlConfig = {
//   entryPoint: "YOUR_IDENTITY_PROVIDER_LOGIN_URL",
//   issuer: "YOUR_APP_IDENTIFIER",
//   cert: `-----BEGIN CERTIFICATE-----
// YOUR_IDENTITY_PROVIDER_CERTIFICATE
// -----END CERTIFICATE-----`,
// };
export const samlConfig = {
  entryPoint: "https://idp.example.com/saml2/idp/SSOService.php",
  issuer: "https://your-app.example.com",
  cert: "-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOC...-----END CERTIFICATE-----",
  callbackUrl: "https://your-app.example.com/api/auth/saml/callback",
};
