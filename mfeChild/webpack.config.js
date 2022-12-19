const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  //http://localhost:3002/remoteEntry.js
  plugins: [
    new ModuleFederationPlugin({
      name: 'childmfe',
      // library: { type: 'var', name: 'childmfe' },
      filename: 'child-remoteEntry.js',
      exposes: {
        './childmfe': './src/App',
      },
      remotes: {
        mainmfe: 'mainmfe@//localhost:3001/main-remoteEntry.js',
      },
      shared: { react: { singleton: true, eager: true }, 'react-dom/client': { singleton: true, eager: true } },
      // shared: { react: { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ]
};

// function getRemoteEntryUrl(port) {
//   const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env;

//   // Check if the example is running on codesandbox
//   // https://codesandbox.io/docs/environment
//   if (!CODESANDBOX_SSE) {
//     return `//localhost:${port}/remoteEntry.js`;
//   }

//   const parts = HOSTNAME.split('-');
//   const codesandboxId = parts[parts.length - 1];

//   return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
// }