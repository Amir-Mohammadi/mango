import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { DeviceResult } from '../../services/api';
import { enumerate } from '../../utils/enumeration';
import { withEnvironment } from '../extensions/with-environment';
import {
    CommonDeviceInfoKey,
    ConnectionStatus,
    DeviceType
} from './device.type';

export const DeviceModel = types
  .model('DeviceModel')
  .props({
    id: types.identifier,
    name: types.optional(types.string, ''),
    type: types.optional(types.string, ''),
    isOwner: types.optional(types.boolean, false),
    label: types.optional(types.string, ''),
    managerId: types.optional(types.string, ''),
    assetId: types.optional(types.string, ''),
    zone: types.optional(types.string, ''),
    category: types.optional(types.string, ''),
    deviceProfileId: types.optional(types.string, ''),
    connectionStatus: types.optional(
      enumerate<ConnectionStatus>(
        'connectionStatus',
        Object.values(ConnectionStatus),
      ),
      ConnectionStatus.Disconnected,
    ),
    deviceType: types.maybeNull(
      types.enumeration('deviceType', [...Object.values(DeviceType)]),
    ),
    deviceData: types.optional(types.map(types.string), {}),
  })
  .volatile(() => ({}))
  .extend(withEnvironment)
  .actions(self => ({
    setConnectionStatus: (): void => {
      const rawLastConnectTime = self.deviceData.get(
        CommonDeviceInfoKey.lastConnectTime,
      );
      const rawLastDisconnectTime = self.deviceData.get(
        CommonDeviceInfoKey.lastDisconnectTime,
      );
      const lastConnectTime =
        rawLastConnectTime === undefined ? 0 : Number(rawLastConnectTime);

      const lastDisconnectTime =
        rawLastDisconnectTime === undefined ? 0 : Number(rawLastDisconnectTime);

      if (lastConnectTime > lastDisconnectTime) {
        self.connectionStatus = ConnectionStatus.Connected;
      } else {
        self.connectionStatus = ConnectionStatus.Disconnected;
      }
    },
    updateDeviceData: (deviceData: Map<string, string>): void => {
      self.deviceData.replace(deviceData);
    },

    updateDevice: (device: DeviceResult): void => {
      self.name = device.name;
      self.type = device.type;
      self.isOwner = device.isOwner;
      self.label = device.label;
      self.managerId = device.managerId;
      self.assetId = device.assetId;
      self.zone = device.zone ?? '';
      self.deviceProfileId = device.deviceProfileId;
    },
  }));

export interface Device extends Instance<typeof DeviceModel> {}
export interface DeviceSnapshot extends SnapshotOut<typeof DeviceModel> {}
