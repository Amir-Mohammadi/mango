import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export async function enableLocationIfNeeded(): Promise<void> {
  await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  });
}
