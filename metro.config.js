const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  'react-dom': require.resolve('react-native'),
};

module.exports = defaultConfig;