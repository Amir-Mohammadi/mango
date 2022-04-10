import { PermissionsAndroid } from 'react-native';

export const getWifiPermissionIfNeeded = async (): Promise<boolean> => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: '',
      message: '',
      buttonNegative: '',
      buttonPositive: '',
    },
  );

  return new Promise<boolean>(resolve => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};
