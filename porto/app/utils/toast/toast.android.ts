import { ToastAndroid } from 'react-native';

export const showAndroidToast = (message: string): void => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};
