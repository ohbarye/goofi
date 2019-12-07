const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  env: {
    api: isDev
      ? "http://localhost:3000"
      : typeof window !== "undefined"
      ? ""
      : process.env.NOW_URL,
    isDev
  },
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};
