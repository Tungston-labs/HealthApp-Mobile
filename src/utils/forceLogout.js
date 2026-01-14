import { clearStorage } from '../storage/asyncStorage';
import { store } from '../redux/store';
import { logout as authLogout } from '../redux/slices/authSlice';
import { navigationRef } from '../navigation/navigationService';

let isLoggingOut = false;

export const forceLogout = () => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  clearStorage();

  store.dispatch(authLogout());
  navigationRef.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });

  isLoggingOut = false;
};
