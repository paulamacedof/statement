const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Define o publicPath para que os chunks sejam servidos corretamente do remote
      webpackConfig.output.publicPath =
        process.env.NODE_ENV === "production"
          ? process.env.PUBLIC_URL + "/"
          : "http://localhost:3002/";

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "statement",
          filename: "remoteEntry.js",
          exposes: {
            "./App": "./src/App",
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: "^18.3.1" },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: "^18.3.1",
            },
          },
        })
      );
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      mode: "file",
    },
  },
};
