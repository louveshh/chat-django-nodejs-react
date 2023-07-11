const { createProxyMiddleware } = require('http-proxy-middleware');

// hardcoded url - web app cannot get
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000',
      changeOrigin: true,
    })
  );
};
