module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@reduxjs/toolkit|immer|react-navigation|@react-navigation/.*|react-native-vector-icons|react-native-safe-area-context|react-native-screens|react-native-gesture-handler)/)',
  ],
};
