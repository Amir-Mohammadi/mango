export const checkDeviceSSID = (SSID: string, regex: RegExp): boolean => {
  if (!regex.test(SSID)) {
    return false;
  }
  return true;
};
