import WiFiManager from 'react-native-wifi-reborn';
import { enableLocationIfNeeded } from './enable-location-if-needed';
import { getWifiPermissionIfNeeded } from './get-wifi-permission.android';

export class WiFiEntry {
  ssid: string;
  bssid?: string;
  frequency?: number;
  signalStrength?: number;

  constructor(ssid: string) {
    this.ssid = ssid;
  }
}

export type WifiScanResult =
  | { state: 'ok'; data: WiFiEntry[] }
  | { state: 'error'; error: string };

export async function getAroundWifiList(): Promise<WifiScanResult> {
  try {
    await getWifiPermissionIfNeeded();
    await enableLocationIfNeeded();

    const aroundWifiList = await WiFiManager.loadWifiList();

    const scanResult = aroundWifiList.map(wifi => {
      const _wifi = new WiFiEntry(wifi.SSID);

      _wifi.bssid = wifi.BSSID;
      _wifi.frequency = wifi.frequency;
      _wifi.signalStrength = wifi.frequency;

      return _wifi;
    });

    return {
      state: 'ok',
      data: scanResult,
    };
  } catch (e: any) {
    console.error('getting around wifi list failed', e);

    return {
      state: 'error',
      error: e,
    };
  }
}
