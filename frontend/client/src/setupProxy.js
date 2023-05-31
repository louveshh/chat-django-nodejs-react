const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target:
        process.env.REACT_APP_API_URL ||
        'https://chat-django-nodejs-react.onrender.com',
      changeOrigin: true,
    })
  );
};
