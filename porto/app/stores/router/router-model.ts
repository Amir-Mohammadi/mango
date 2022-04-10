import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const RouterInfoModel = types.model('RouterInfo').props({
  SSID: types.optional(types.identifier, ''),
  BSSID: types.optional(types.string, ''),
  password: types.optional(types.string, ''),
});

type RouterInfoType = Instance<typeof RouterInfoModel>;
export interface RouterInfo extends RouterInfoType {}

type RouterInfoSnapshotType = SnapshotOut<typeof RouterInfoModel>;
export interface RouterInfoSnapshot extends RouterInfoSnapshotType {}

export const RouterModel = types.model('Router').props({
  SSID: types.identifier,
  BSSID: types.optional(types.string, ''),
});

type RouterType = Instance<typeof RouterModel>;
export interface Router extends RouterType {}

type RouterSnapshotType = SnapshotOut<typeof RouterModel>;
export interface RouterSnapshot extends RouterSnapshotType {}
