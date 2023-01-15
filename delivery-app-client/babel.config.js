module.exports = function () {
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@': './src',
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
