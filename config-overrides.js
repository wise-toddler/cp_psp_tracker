const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = function override(config, env) {
  // Get the path to the .env file
  const envPath = path.resolve(__dirname, '.env');

  // Load environment variables from .env file
  const fileEnv = dotenv.config({ path: envPath }).parsed;

  // Merge it with process.env
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  // Add it to the webpack plugins
  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin(envKeys)
  ];

  return config;
};