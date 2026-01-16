import Toast from 'react-native-toast-message';

export const showError = (msg) => {
  Toast.show({
    type: 'error',
    text1: msg,
    position: 'top',
  });
};

export const showSuccess = (msg) => {
  Toast.show({
    type: 'success',
    text1: msg,
    position: 'top',
  });
};
