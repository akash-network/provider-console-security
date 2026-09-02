// This module exports a function that provides configuration settings for the application.
// The settings are loaded from environment variables, which allows for different configurations
// based on the deployment environment (development, staging, production, etc.).

export default () => ({
  // The port on which the application will run. If not specified, it defaults to 3000.
  port: parseInt(process.env.PORT, 10) || 3000,

  // MongoDB configuration details including connection string and database name.
  // tlsCaCert holds the PEM content of the CA certificate (not a file path), for
  // self-hosted MongoDB with TLS; leave unset for connections that need no custom CA.
  mongodb: {
    connectionString: process.env.MONGO_DB_CONNECTION_STRING,
    name: process.env.MONGO_DB_NAME,
    tlsCaCert: process.env.MONGO_TLS_CA_CERT,
  },

  // Security keys used for cryptographic operations.
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,

  // Host configuration for various services within the application.
  securityHost: process.env.SECURITY_HOST,
  apiHost: process.env.API_HOST,
  providerConsoleAppHost: process.env.APP_HOST,

  // Configuration for token durations, specifying how long access and refresh tokens should last.
  accessTokenDuration: process.env.ACCESS_TOKEN_DURATION,
  refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION,
});
