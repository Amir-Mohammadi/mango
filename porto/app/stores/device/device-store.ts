import { flow, getRoot, Instance, SnapshotOut, types } from 'mobx-state-tree';
import {
    AuthenticationResult,
    DeviceConnectionPairKeyResult,
    DeviceResult
} from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import { DeviceApi } from '../../services/api/device/device-api';
import { DeviceSubscription, getEnumKeyByEnumValue } from '../../utils';
import { ConvertToMap } from '../../utils/map-convert';
import { Asset } from '../asset/asset-model';
import { withEnvironment } from '../extensions/with-environment';
import { RootStore } from '../root/root-store';
import { Device, DeviceModel } from './device-model';
import { ConnectionStatus, DeviceType } from './device.type';

export const DeviceStoreModel = types
  .model('DeviceStore')
  .props({
    /**
     * this is user devices list
     */
    devices: types.map(DeviceModel),

    /**
     * current device id
     */
    currentDeviceId: types.optional(types.string, ''),

    /**
     * current asset id
     */
    currentAssetId: types.optional(types.string, ''),
  })
  .volatile(() => ({
    /**
     * only for the promise type actions, this flag going to be true middle of the process
     */
    isLoading: false,
    /**
     * web socket url
     */
    wsUrl: '',

    /**
     * current device id
     */
    deviceSubscription: DeviceSubscription.prototype,
  }))
  .views(self => ({
    get deviceList(): Device[] {
      return [...self.devices.values()].filter(
        x => x.assetId === self.currentAssetId,
      );
    },

    get currentAsset(): Asset | undefined {
      const rootStore = getRoot(self) as RootStore;
      return rootStore.assetStore.assets.get(self.currentAssetId);
    },

    get deviceTelemetries(): Map<string, string> | undefined {
      return self.devices.get(self.currentDeviceId)?.deviceData;
    },

    get connectionStatus(): ConnectionStatus | undefined {
      return self.devices.get(self.currentDeviceId)?.connectionStatus;
    },

    get device(): Device | undefined {
      return self.devices.get(self.currentDeviceId);
    },
  }))
  .extend(withEnvironment)
  .actions(self => ({
    updateDevices: (devices: DeviceResult[]): void => {
      const currentList = self.deviceList;
      /**
       * delete current list from devices that doesn't exist
       */
      for (let i = 0; i < currentList.length; i++) {
        self.devices.delete(currentList[i].id);
      }

      /**
       * update received new list to current list
       */
      for (let i = 0; i < devices.length; i++) {
        const deviceType =
          getEnumKeyByEnumValue(DeviceType, devices[i].type) ?? 'undefined';

        self.devices.set(
          devices[i].id,
          DeviceModel.create({
            id: devices[i].id,
            deviceProfileId: devices[i].deviceProfileId,
            assetId: devices[i].assetId,
            name: devices[i].name,
            managerId: devices[i].managerId,
            label: devices[i].label,
            zone: devices[i].zone ?? '',
            category: 'تعیین نشده',
            type: devices[i].type,
            deviceType: DeviceType[deviceType],
          }),
        );
      }

      /**
       * set current device id to default
       */
      if (self.currentDeviceId !== '') {
        const currentDevice = self.devices.get(self.currentDeviceId);
        if (currentDevice === null || currentDevice === undefined) {
          if (self.deviceList.length > 0)
            self.currentDeviceId = self.deviceList[0].id;
          else self.currentDeviceId = '';
        }
      }
    },
  }))
  .actions(self => ({
    getDevices: flow(function* () {
      self.isLoading = true;
      let result = false;
      const deviceApi = new DeviceApi(self.environment.api);
      const response: ApiResponse<Array<DeviceResult>> =
        yield deviceApi.getDevices(self.currentAssetId, null);
      if (response.kind === 'ok') {
        self.updateDevices(response.data);
        result = true;
      }
      self.isLoading = false;

      return result;
    }),

    parseTelemetries: (rootDevice: Device | null, data: string): void => {
      const device = rootDevice ?? self.devices.get(self.currentDeviceId);

      if (device !== undefined) {
        const obj = JSON.parse(data);
        const map = ConvertToMap(device.deviceData, obj.data);
        device.updateDeviceData(map);
        device.setConnectionStatus();
      }
    },

    /**
     * prepare ws url
     */
    prepareWsUrl: flow(function* () {
      const deviceApi = new DeviceApi(self.environment.api);
      const response: ApiResponse<AuthenticationResult> =
        yield deviceApi.getDeviceUserToken(self.currentAssetId);

      if (response.kind === 'ok') {
        self.wsUrl =
          'ws://95.80.182.57:8080/api/ws/plugins/telemetry?token=' +
          response.data.token;
        return true;
      }
      return false;
    }),

    /**
     *set current device id
     */
    setCurrentDeviceId: (deviceId: string): void => {
      self.currentDeviceId = deviceId;
    },
    /**
     *set connection status  id
     */
    setConnectionStatus: (connectionStatus: ConnectionStatus): void => {
      const device = self.devices.get(self.currentDeviceId);
      if (device !== undefined) {
        device.connectionStatus = connectionStatus;
      }
    },

    /**
     * rpc
     */
    rpc: flow(function* (method: string, value: boolean) {
      const device = self.devices.get(self.currentDeviceId);

      if (device !== undefined) {
        const deviceApi = new DeviceApi(self.environment.api);
        const response: ApiResponse<boolean> = yield deviceApi.rpc(
          device.assetId,
          self.currentDeviceId,
          method,
          value,
        );

        if (response.kind === 'ok') {
          return true;
        }
        return false;
      }
      return false;
    }),

    /**
     * editDeviceName
     */
    editDeviceName: flow(function* (deviceName: string) {
      const device = self.devices.get(self.currentDeviceId);
      if (device !== undefined) {
        const deviceApi = new DeviceApi(self.environment.api);
        const response: ApiResponse<boolean> = yield deviceApi.editDeviceName(
          device.assetId,
          self.currentDeviceId,
          {
            deviceIdentifier: device.name,
            deviceProfileId: device.deviceProfileId,
            label: deviceName,
            type: device.type,
            zone: device.zone,
          },
        );

        if (response.kind === 'ok') {
          return true;
        }
        return false;
      }
      return false;
    }),
    setNewZone: flow(function* (deviceZone: string) {
      const device = self.devices.get(self.currentDeviceId);
      if (device !== undefined) {
        const deviceApi = new DeviceApi(self.environment.api);
        const response: ApiResponse<boolean> = yield deviceApi.editDeviceName(
          device.assetId,
          self.currentDeviceId,
          {
            deviceIdentifier: device.name,
            deviceProfileId: device.deviceProfileId,
            label: device.label,
            type: device.type,
            zone: deviceZone,
          },
        );

        if (response.kind === 'ok') {
          return true;
        }
        return false;
      }
      return false;
    }),

    /**
     * getDevice
     */
    getDevice: flow(function* () {
      self.isLoading = true;

      const deviceApi = new DeviceApi(self.environment.api);
      const response: ApiResponse<DeviceResult> = yield deviceApi.getDevice(
        self.device?.assetId ?? '',
        self.device?.id ?? '',
      );

      if (response.kind === 'ok') {
        const device = self.devices.get(self.device?.id ?? '');
        device?.updateDevice(response.data);
      }

      self.isLoading = false;

      return response;
    }),
    /**
     * get device pairKey
     */
    getDeviceConnectionPairKey: flow(function* (deviceName: string) {
      let result = '';
      const deviceApi = new DeviceApi(self.environment.api);
      const response: ApiResponse<DeviceConnectionPairKeyResult> =
        yield deviceApi.getDeviceConnectionPairKey(deviceName);

      if (response.kind === 'ok') {
        result = response.data.pairKey;
      }

      return result;
    }),
  }))
  .actions(self => ({
    getSubscriptionMessage: (): string => {
      self.deviceSubscription = new DeviceSubscription(self.deviceList);
      return self.deviceSubscription.subscriptionMessage;
    },

    parseSubscriptionMessage: (event: any): void => {
      const parsedMessage = self.deviceSubscription.parseMessage(event.data);
      parsedMessage.forEach((value, key) => {
        const device = self.devices.get(key);
        if (device !== undefined) {
          self.parseTelemetries(device, value);
        }
      });
    },
  }))
  .actions(self => ({
    setCurrentAssetId: (assetId: string | null): void => {
      if (assetId !== null) {
        self.currentAssetId = assetId;
        self.getDevices();
      }
    },
  }));
export interface DeviceStore extends Instance<typeof DeviceStoreModel> {}
export interface DeviceStoreSnapshot
  extends SnapshotOut<typeof DeviceStoreModel> {}
