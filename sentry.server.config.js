// sentry.server.config.js
import * as Sentry from ".gitignore/node_modules/@sentry/nextjs/src/index.types";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,
  // captureUnhandledRejections: true,  // optional
  // captureUncaughtExceptions: true
});
