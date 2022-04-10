import NetInfo from '@react-native-community/netinfo';
import { cancelable, CancelablePromise } from 'cancelable-promise';
import WiFiManager from 'react-native-wifi-reborn';
import { sleep } from '../../utils/sleep';
import { DeviceConfigApi } from '../api';
import { Config, ConfigStatus, ConfigStatusKeys } from './config.interface';

class CancellationToken {
  isCancellationRequested: boolean;

  constructor() {
    this.isCancellationRequested = false;
  }
}

export class APSoftConfig implements Config {
  status: ConfigStatus;
  counterTime: number;
  counterRef!: NodeJS.Timer;
  counterUpdateCallbackRef?: (timeInSec: number) => void;
  statusUpdateCallbackRef?: (state: ConfigStatus) => void;
  cancellationToken: CancellationToken = new CancellationToken();
  deviceConfigApi = new DeviceConfigApi();
  deviceRegex: RegExp = new RegExp(/^elevia-.*$/g);
  deviceSSID: string | null = null;
  worker: CancelablePromise<void> | null = null;

  constructor() {
    this.status = {
      key: ConfigStatusKeys.NotYetStarted,
    };
    this.counterTime = 0;
  }

  private _countdown(): void {
    if (this.counterTime > 0) {
      this.counterTime -= 1;
      this.counterUpdateCallbackRef?.(this.counterTime);
    }
    if (this.counterTime <= 0) {
      this._updateAppStatus({
        key: ConfigStatusKeys.Failed,
      });
      this.worker?.cancel();
    }
  }

  private _startCountdown(periodIsSec: number) {
    clearInterval(this.counterRef);
    this.counterTime = periodIsSec;
    this.counterRef = setInterval(this._countdown.bind(this), 1000);
  }

  private _stopCountdown() {
    this.counterTime = 0;
    clearInterval(this.counterRef);
  }

  private _updateAppStatus(newStatus: ConfigStatus) {
    this.status = newStatus;
    this.statusUpdateCallbackRef?.(newStatus);
  }

  private async sendCredential() {
    console.log('sendCredential');

    await WiFiManager.forceWifiUsageWithOptions(true, { noInternet: true });

    const res = await this.deviceConfigApi.sendCredential({
      accessToken: 'key12345678_00000701',
      ownerKey: '12345678',
      pairKey: '1234',
      password: 'moayyedIOT99',
      ssid: 'IoT',
    });

    await WiFiManager.forceWifiUsageWithOptions(false, { noInternet: false });

    if (res.kind !== 'ok') {
      throw new Error('no device configured');
    }

    if (this.deviceSSID) {
      var red = await WiFiManager.isRemoveWifiNetwork(this.deviceSSID);
      console.log(red, this.deviceSSID);
    }

    console.log('send credential done ');
  }

  private async checkIfWeConnectedToDevice(numberOfTries: number = 10) {
    this._startCountdown(10);

    for (let i = 0; i < numberOfTries; i++) {
      let ssid = await WiFiManager.getCurrentWifiSSID();
      if (this.deviceRegex.test(ssid)) {
        console.log('yes, connected to device wifi');
        this.deviceSSID = ssid;
        this._updateAppStatus({
          key: ConfigStatusKeys.SendingToDevice,
        });
        return;
      }
      await sleep(1000);
    }

    throw new Error('not connected to device');
  }

  private waitForNetwork(): Promise<void> {
    this._startCountdown(30);
    console.log('waiting for network');

    return new Promise<void>((resolve, reject) => {
      const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isInternetReachable) {
          unsubscribe();
          resolve();
          console.log('internet connected;');
        }
      });
      setTimeout(() => {
        unsubscribe();
        reject(new Error('timeout'));
      }, 30000);
    });
  }

  public start(): void {
    console.log('started');
    this.worker?.cancel();

    this.worker = cancelable(this.checkIfWeConnectedToDevice())
      .then(() => {
        cancelable(this.sendCredential())
          .then(res => {
            cancelable(this.waitForNetwork()).then(res => {
              this._updateAppStatus({
                key: ConfigStatusKeys.Finished,
              });
              this._stopCountdown();
            });
          })
          .catch(error => {
            this._updateAppStatus({
              key: ConfigStatusKeys.Failed,
            });
          });
      })
      .catch(error => {
        this._updateAppStatus({
          key: ConfigStatusKeys.Failed,
        });
      });
  }

  public cancel(): ConfigStatus {
    console.log('cancelled');
    this.worker?.cancel();
    clearInterval(this.counterRef);

    return {
      key: ConfigStatusKeys.Failed,
      errorMessage: 'failed',
    };
  }

  public onStatusChange(callback: (state: ConfigStatus) => void): void {
    this.statusUpdateCallbackRef = callback;
    this._updateAppStatus(this.status);
  }

  public onCounterUpdate(callback: (timeInSec: number) => void): void {
    this.counterUpdateCallbackRef = callback;
    this.counterUpdateCallbackRef(this.counterTime);
  }
}
