import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast config={toastConfig} />
    </Provider>
  );
}
