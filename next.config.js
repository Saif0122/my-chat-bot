// next.config.js
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  // your existing Next.js config
  reactStrictMode: true,
};

const sentryWebpackPluginOptions = {
  // additional config options for the Sentry Webpack plugin
  // e.g. silent: true // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
