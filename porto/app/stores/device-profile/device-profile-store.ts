import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { DeviceProfile } from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import { DeviceApi } from '../../services/api/device/device-api';
import { withEnvironment } from '../extensions/with-environment';
import { DeviceProfileModel } from './device-profile-model';

export const DeviceProfileStoreModel = types
  .model('DeviceProfileStore')
  .props({
    deviceProfiles: types.optional(types.array(DeviceProfileModel), []),
  })
  .volatile(() => ({
    /**
     * only for the promise type actions, this flag going to be true middle of the process
     */
    isLoading: true,
  }))
  .views(self => ({
    get deviceProfilesView(): DeviceProfile[] {
      return self.deviceProfiles;
    },
  }))
  .extend(withEnvironment)
  .actions(self => ({
    /**
     * this action will get device profiles from
     */
    getDevicesProfile: flow(function* () {
      self.isLoading = true;

      const deviceApi = new DeviceApi(self.environment.api);

      const response: ApiResponse<Array<DeviceProfile>> =
        yield deviceApi.getDeviceProfiles();

      if (response.kind === 'ok') {
        self.deviceProfiles.replace(
          response.data.map(item => {
            return {
              id: item.id,
              profileImage: item.profileImage,
              profileName: item.profileName,
              profileRegex: item.profileRegex,
            };
          }),
        );
      }
      self.isLoading = false;
      return response;
    }),
  }));

type DeviceProfileStoreType = Instance<typeof DeviceProfileStoreModel>;
export interface DeviceProfileStore extends DeviceProfileStoreType {}
type DeviceProfileStoreSnapshotType = SnapshotOut<
  typeof DeviceProfileStoreModel
>;
export interface DeviceProfileStoreSnapshot
  extends DeviceProfileStoreSnapshotType {}
