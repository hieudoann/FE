// craco.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add cesium as a webpack alias
      webpackConfig.resolve.alias['cesium'] = path.resolve(__dirname, 'node_modules/cesium/Source');

      // Copy Cesium Assets, Widgets, and Plugins to the public folder
      webpackConfig.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join('node_modules', 'cesium', 'Build', 'Cesium', 'Assets'),
              to: 'Assets',
            },
            {
              from: path.join('node_modules', 'cesium', 'Build', 'Cesium', 'Widgets'),
              to: 'Widgets',
            },
            {
              from: path.join('node_modules', 'cesium', 'Build', 'Cesium', 'ThirdParty'),
              to: 'ThirdParty',
            },
            {
              from: path.join('node_modules', 'cesium', 'Build', 'Cesium', 'Workers'),
              to: 'Workers',
            },
          ],
        })
      );

      // Define CESIUM_BASE_URL for Cesium assets
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('')
        })
      );

      // Modify module rules to handle Cesium's binary assets
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        include: path.resolve(__dirname, 'node_modules/cesium'),
        sideEffects: false,
        use: [{
          loader: 'strip-pragma-loader',
          options: {
            pragmas: {
              debug: false,
            },
          },
        }],
      });

      return webpackConfig;
    },
  },
};