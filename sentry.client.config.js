// sentry.client.config.js
import * as Sentry from ".gitignore/node_modules/@sentry/nextjs/src/index.types";

Sentry.init({
  dsn: process.env.SENTRY_DSN,       // your DSN from Sentry dashboard
  tracesSampleRate: 0.2,             // adjust in production
  // …any other config, e.g. environment, release…
});
