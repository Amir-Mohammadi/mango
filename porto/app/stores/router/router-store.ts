import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { RouterInfo } from '.';
import { DeviceConfigApi, DeviceWifi } from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import {
    getAroundWifiList,
    WiFiEntry,
    WifiScanResult
} from '../../utils/wifi/get-around-wifis';
import { withEnvironment } from '../extensions/with-environment';
import { Router, RouterInfoModel, RouterModel } from './router-model';

export const RouterStoreModel = types
  .model('RouterStore')
  .props({
    savedRouters: types.map(RouterInfoModel),
    routers: types.map(RouterModel),
  })
  .volatile(() => ({
    /**
     * only for the promise type actions, this flag going to be true middle of the process
     */
    isLoading: true,

    /**
     * selected router
     */
    selectedRouterSSID: '',
  }))
  .views(self => ({
    get selectedRouter(): RouterInfo {
      let selectedRouter = self.savedRouters.get(self.selectedRouterSSID);
      if (!selectedRouter) {
        console.error(
          'seems like we lost the selected router, fallback to first saved password in list',
        );
        selectedRouter = [...self.savedRouters.values()][0];
      }

      return selectedRouter;
    },
    get routersList(): Router[] {
      return [...self.routers.values()];
    },
  }))
  .extend(withEnvironment)
  .actions(self => ({
    /**
     * this action will get nearby routers
     */
    getDeviceWifiList: flow(function* () {
      self.isLoading = true;

      self.routers.clear();

      const deviceConfigApi = new DeviceConfigApi();

      const response: ApiResponse<Array<DeviceWifi>> =
        yield deviceConfigApi.getDeviceWifiList();

      if (response.kind === 'ok') {
        response.data.forEach(item => {
          self.routers.put({
            SSID: item.SSID,
            BSSID: item.BSSID,
          });
        });
      }

      self.isLoading = false;
    }),
    /**
     * this action will get nearby routers
     */
    getNearbyRouters: flow(function* (regex?: string) {
      self.isLoading = true;
      self.routers.clear();

      const wifiScanResult: WifiScanResult = yield getAroundWifiList();

      if (wifiScanResult.state === 'ok') {
        const routers = wifiScanResult.data;

        let validRouters: WiFiEntry[] = [];
        if (regex) {
          validRouters = routers.filter(x => !(new RegExp(regex).test(x.ssid)));
        }

        validRouters.forEach(item => {
          if (item.bssid && !self.savedRouters.get(item.ssid)) {
            self.routers.put({
              SSID: item.ssid,
              BSSID: item.bssid,
            });
          }
        });

        console.log(validRouters);
      }

      self.isLoading = false;
    }),
    /**
     * this action will save router
     */
    saveRouter: (SSID: string, BSSID: string, password: string): void => {
      self.savedRouters.set(SSID, {
        SSID: SSID, 
        BSSID: BSSID,
        password: password,
      });
    },

    /**
     * this action will delete router
     */

    deleteRouter: (SSID: string): void => {
      self.savedRouters.delete(SSID);
    },

    /**
     * this action will change router password
     */
    changeRouterPassword: (SSID: string, password: string): void => {
      const router = self.savedRouters.get(SSID);
      if (!router) throw new Error('cannot find the router');
      router.password = password;
    },

    /**
     * this action will select router
     */
    selectRouter: (SSID: string): void => {
      self.selectedRouterSSID = SSID;
    },
  }));

type RouterStoreType = Instance<typeof RouterStoreModel>;
export interface RouterStore extends RouterStoreType {}

type RouterStoreSnapshotType = SnapshotOut<typeof RouterStoreModel>;
export interface RouterStoreSnapshot extends RouterStoreSnapshotType {}
