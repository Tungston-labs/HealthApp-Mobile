import Toast from 'react-native-toast-message';

export const showError = (title, message, options = {}) => {
  let text1 = title;
  let text2 = message;

  if (message === undefined && typeof title === 'string') {
    text1 = 'Error';
    text2 = title;
  }

  Toast.show({
    type: 'error',
    text1,
    text2,
    position: 'top',
    ...options,
  });
};

export const showSuccess = (title, message, options = {}) => {
  let text1 = title;
  let text2 = message;

  if (message === undefined && typeof title === 'string') {
    text1 = 'Success';
    text2 = title;
  }

  Toast.show({
    type: 'success',
    text1,
    text2,
    position: 'top',
    ...options,
  });
};

export const showInfo = (title, message, options = {}) => {
  let text1 = title;
  let text2 = message;

  if (message === undefined && typeof title === 'string') {
    text1 = 'Info';
    text2 = title;
  }

  Toast.show({
    type: 'info',
    text1,
    text2,
    position: 'top',
    ...options,
  });
};

