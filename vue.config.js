const path = require("path");

module.exports = {
	chainWebpack: config => {
		config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
	},
	devServer: {
		overlay: false,
		port: 8080, //dev server port
		proxy: {
			"/api": {
				target: "http://localhost:8080/api",
				changeOrigin: true,
				// exposedHeaders: ['Content-Disposition'],
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
};
