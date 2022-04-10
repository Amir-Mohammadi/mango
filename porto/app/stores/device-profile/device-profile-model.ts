import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const DeviceProfileModel = types.model('DeviceProfile').props({
  id: types.identifierNumber,
  profileName: types.optional(types.string, ''),
  profileImage: types.optional(types.string, ''),
  profileRegex: types.optional(types.string, ''),
});

type DeviceProfileType = Instance<typeof DeviceProfileModel>;
export interface DeviceProfile extends DeviceProfileType {}

type DeviceProfileSnapshotType = SnapshotOut<typeof DeviceProfileModel>;
export interface DeviceProfileSnapshot extends DeviceProfileSnapshotType {}
