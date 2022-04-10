import { flow, getRoot, Instance, SnapshotOut, types } from 'mobx-state-tree';
import WiFiManager, { WifiEntry } from 'react-native-wifi-reborn';
import { RootStore } from '..';
import { DeviceConfigApi } from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import { checkDeviceSSID } from '../../utils/check-device-ssid';
import EsptouchSmartConfig, {
  EsptouchSmartConfigResult,
} from '../../utils/EsptouchSmartConfig';
import { routersMock } from '../../utils/mock/router-mock';
import { sleep } from '../../utils/sleep';
import { withEnvironment } from '../extensions/with-environment';
import { RouterInfo } from '../router/router-model';
import { ConfigSteps } from './device-config-model';

export const DeviceConfigStoreModel = types
  .model({
    /**
     * store detected device SSID
     */
    deviceSSID: types.optional(types.string, ''),
    /**
     * store detected device BSSID
     */
    deviceBSSID: types.optional(types.string, ''),
    /**
     * indicate config step
     */
  })
  .volatile(() => ({
    configStep: ConfigSteps.Start,

    /**
     * device wifi connected
     */
    isDeviceWifiConnected: false,

    /**
     * device pair Key
     */
    pairKey: '',
  }))
  .extend(withEnvironment)
  .actions(self => ({
    generatePairKey: (): string => {
      self.pairKey = Math.floor(Math.random() * 10000).toString();
      return self.pairKey;
    },
  }))
  .actions(self => ({
    /**
     * search wifi to detects config mode
     */
    findDevice: (wifiList: WifiEntry[], regex: string): boolean => {
      let result = false;
      const validDevices = wifiList.filter(x =>
        checkDeviceSSID(x.SSID, new RegExp(regex)),
      );

      if (validDevices.length > 0) {
        self.deviceBSSID = validDevices[0].BSSID;
        self.deviceSSID = validDevices[0].SSID;
        result = true;
      }
      return result;
    },
    detectDevice: flow(function* (regex: string) {
      yield sleep(10000);
      const rand = Math.random() * 100;
      if (rand > 0) {
        const routers = routersMock;
        const validRouters = routers.filter(x =>
          checkDeviceSSID(x.SSID, new RegExp(regex)),
        );

        if (validRouters.length > 0) {
          return true;
        }
        return false;
      }
      return false;
    }),

    resetDefault: (): void => undefined,

    resetStoreState: (): void => {
      self.deviceBSSID = '';
      self.deviceSSID = '';
    },

    cancelConfigDevice: (): void => {
      EsptouchSmartConfig.stop();
    },

    connectToUserRouter: flow(function* () {
      const rootStore = getRoot(self) as RootStore;
      const selected = rootStore.routerStore.selectedRouter as RouterInfo;

      try {
        self.configStep = ConfigSteps.FirstStep;
        yield WiFiManager.connectToProtectedSSID(
          selected.SSID,
          selected.password,
          false,
        );
      } catch (e) {}
    }),

    sendRouterCredential: flow(function* () {
      const rootStore = getRoot(self) as RootStore;
      const selected = rootStore.routerStore.selectedRouter as RouterInfo;

      try {
        self.configStep = ConfigSteps.SecondStep;
        yield sleep(1000);
        const res: EsptouchSmartConfigResult[] =
          yield EsptouchSmartConfig.start({
            BSSID: selected.BSSID,
            SSID: selected.SSID,
            password: selected.password,
          });
        console.log('esp touch done');

        if (res.length === 0) {
          self.configStep = ConfigSteps.Failed;
          console.error('no device configured');
          return ConfigSteps.Failed;
        }

        self.configStep = ConfigSteps.Finish;
      } catch (e) {
        console.error(e);
        self.configStep = ConfigSteps.Failed;
      }

      return self.configStep;
    }),

    setDeviceWifi: flow(function* (
      ssid: string,
      password: string,
      pairKey: string,
    ) {
      try {
        const deviceConfigApi = new DeviceConfigApi();

        const res: ApiResponse<boolean> = yield deviceConfigApi.setDeviceRouter(
          ssid,
          password,
          pairKey,
        );

        if (res.kind === 'ok') {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }),

    resetConfigStep: (): void => {
      self.configStep = ConfigSteps.Start;
    },

    setDeviceWifiConnected: (isConnected: boolean): void => {
      self.isDeviceWifiConnected = isConnected;
    },
    connectDeviceWifi: flow(function* () {
      try {
        if (self.deviceSSID !== '') {
          yield WiFiManager.connectToProtectedSSID(
            self.deviceSSID,
            '12345678',
            false,
          );
          self.isDeviceWifiConnected = true;
          return true;
        }

        self.isDeviceWifiConnected = false;
        return false;
      } catch (e) {
        console.error(e);
        self.isDeviceWifiConnected = false;
        return false;
      }
    }),
  }));

type DeviceConfigStoreType = Instance<typeof DeviceConfigStoreModel>;
export interface DeviceConfigStore extends DeviceConfigStoreType {}
type DeviceConfigStoreSnapshotType = SnapshotOut<typeof DeviceConfigStoreModel>;
export interface DeviceConfigStoreSnapshot
  extends DeviceConfigStoreSnapshotType {}
