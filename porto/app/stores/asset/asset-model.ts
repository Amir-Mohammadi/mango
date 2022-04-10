import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { AssetResult } from '../../services/api/asset/asset-api.type';
import { withEnvironment } from '../extensions/with-environment';

export const AssetModel = types
  .model('AssetModel')
  .props({
    id: types.identifier,
    name: types.optional(types.string, ''),
    type: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    managerId: types.optional(types.string, ''),
    ownerId: types.optional(types.string, ''),
  })
  .volatile(() => ({}))
  .extend(withEnvironment)
  .actions(self => ({
    updateAssetMap: (item: AssetResult): void => {
      self.name = item.name;
      self.type = item.type;
      self.label = item.label;
      self.managerId = item.managerId;
      self.ownerId = item.ownerId;
    },
  }));

export interface Asset extends Instance<typeof AssetModel> {}
export interface AssetSnapshot extends SnapshotOut<typeof AssetModel> {}
