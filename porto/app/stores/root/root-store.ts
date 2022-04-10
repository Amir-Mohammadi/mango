import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { AssetStoreModel } from '../asset';
import { AuthStoreModel } from '../auth/auth-store';
import { DeviceStoreModel } from '../device';
import { DeviceConfigStoreModel } from '../device-config';
import { DeviceProfileStoreModel } from '../device-profile';
import { DialogStoreModel } from '../dialog/dialog-store';
import { RouterStoreModel } from '../router/router-store';
import { UserStoreModel } from '../user/user-store';
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
  dialogStore: types.optional(DialogStoreModel, {}),
  deviceStore: types.optional(DeviceStoreModel, {}),
  deviceProfileStore: types.optional(DeviceProfileStoreModel, {}),
  deviceConfigStore: types.optional(DeviceConfigStoreModel, {}),
  routerStore: types.optional(RouterStoreModel, {}),
  assetStore: types.optional(AssetStoreModel, {})
}).actions(self => ({
  reset: (): void => {
    self.authStore = AuthStoreModel.create({})
    self.userStore = UserStoreModel.create({});
    self.dialogStore = DialogStoreModel.create({})
    self.deviceStore = DeviceStoreModel.create({})
    self.deviceProfileStore = DeviceProfileStoreModel.create({})
    self.deviceConfigStore = DeviceConfigStoreModel.create({})
    self.routerStore = RouterStoreModel.create({})
    self.assetStore = AssetStoreModel.create({})
  }
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
