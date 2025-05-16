const locale = navigator.language || "en-US";

// pages/_app.js
import * as Sentry from ".gitignore/node_modules/@sentry/nextjs/src/index.types";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// pages/_app.js
import { useState, useEffect, createContext } from "react";
import "../styles/globals.css";

export const UserContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
