const withTypescript = require('@zeit/next-typescript')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = withTypescript({
  publicRuntimeConfig: {
    api: isDev ? 'http://localhost:3000' : typeof window !== 'undefined' ? '' : process.env.NOW_URL,
    isDev,
  }
});
