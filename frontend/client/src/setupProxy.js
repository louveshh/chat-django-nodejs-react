const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://chat-django-nodejs-react.onrender.com',
			changeOrigin: true,
		})
	);
};
