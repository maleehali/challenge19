const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin'); // Correctly import WorkboxPlugin

module.exports = {
  entry: './client/src/js/index.js', // Ensure this path is correct
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/, // Add CSS loaders
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/, // Add Babel for JS transpiling
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html', // Ensure this path is correct
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      name: 'Text Editor PWA',
      short_name: 'TextEditor',
      description: 'A simple text editor PWA.',
      background_color: '#ffffff',
      theme_color: '#317EFB',
      start_url: '/',
      display: 'standalone',
      icons: [
        {

              sizes: [96, 128, 192, 256, 384, 512], // Specify icon sizes
          destination: path.join('icons'),
        },
      ],
    }),
  ],
};
