const { createProxyMiddleware } = require('http-proxy-middleware');

const targetProxy = process.env.REACT_APP_API_URL;
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: targetProxy,
      changeOrigin: true,
    })
  );
};
