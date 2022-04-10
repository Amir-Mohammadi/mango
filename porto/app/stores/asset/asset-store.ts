import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import {
  AssetApi,
  AssetResult,
  ShareAssetResult,
  VoidResult,
} from '../../services/api';
import { ApiResponse } from '../../services/api/api.type';
import { withEnvironment } from '../extensions/with-environment';
import { Asset, AssetModel } from './asset-model';

export const AssetStoreModel = types
  .model('AssetStore')
  .props({
    /**
     * user phone number
     */
    phone: types.optional(types.string, ''),
    /**
     * asset id
     */
    id: types.optional(types.string, ''),
    /**
     * sharing token
     */
    sharingToken: types.optional(types.string, ''),
    /**
     * this is user asset list
     */
    assets: types.map(AssetModel),
    /**
     * asset type
     */
    type: types.optional(types.string, ''),
    /**
     * asset label
     */
    label: types.optional(types.string, ''),
  })
  .volatile(() => ({
    /**
     * only for the promise type actions, this flag going to be true middle of the process
     */
    isLoading: false,
  }))
  .views(self => ({
    get assetList(): Asset[] {
      return [...self.assets.values()];
    },
  }))
  .extend(withEnvironment)
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    assetShare: flow(function* (id: string, phone: string) {
      self.isLoading = true;

      const assetApi = new AssetApi(self.environment.api);

      const response: ApiResponse<ShareAssetResult> = yield assetApi.share({
        id: id,
        phone: phone,
      });

      self.isLoading = false;
      return response;
    }),
  }))
  .actions(self => ({
    getAssetById: (id: string): Asset | undefined => {
      return self.assets.get(id);
    },
  }))
  .actions(self => ({
    /**
     * this action will get user profile from
     */
    assetShareVerify: flow(function* (sharingToken: string) {
      self.isLoading = true;

      const assetApi = new AssetApi(self.environment.api);

      const response: ApiResponse<VoidResult> = yield assetApi.verifyShare({
        sharingToken: sharingToken,
      });

      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    transferOwner: flow(function* (assetId: string, deviceMacAddress: string) {
      self.isLoading = true;

      const assetApi = new AssetApi(self.environment.api);

      const response: ApiResponse<void> = yield assetApi.transferOwner(
        assetId,
        deviceMacAddress,
      );
      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    editAsset: flow(function* (id: string, type: string, label: string) {
      self.isLoading = true;

      const assetApi = new AssetApi(self.environment.api);

      const response: ApiResponse<AssetResult> = yield assetApi.editAsset({
        id: id,
        type: type,
        label: label,
      });
      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    deleteAsset: flow(function* (id: string) {
      self.isLoading = true;

      const assetApi = new AssetApi(self.environment.api);

      const response: ApiResponse<AssetResult> = yield assetApi.deleteAsset({
        id: id,
      });
      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    addAsset: flow(function* (type: string, label: string) {
      self.isLoading = true;

      const assetApi = new AssetApi(self.environment.api);

      const response: ApiResponse<AssetResult> = yield assetApi.addAsset({
        type: type,
        label: label,
      });
      self.isLoading = false;

      return response;
    }),
  }))
  .actions(self => ({
    updateAssets: (assets: AssetResult[]): void => {
      const currentList = self.assetList;
      /**
       * delete current list from devices that doesn't exist
       */
      for (let i = 0; i < currentList.length; i++) {
        self.assets.delete(currentList[i].id);
      }

      /**
       * update received new list to current list
       */
      for (let i = 0; i < assets.length; i++) {
        self.assets.set(
          assets[i].id,
          AssetModel.create({
            id: assets[i].id,
            name: assets[i].name,
            managerId: assets[i].managerId,
            ownerId: assets[i].ownerId,
            label: assets[i].label,
            type: assets[i].type,
          }),
        );
      }
    },
  }))
  .actions(self => ({
    /**
     * get assets listD
     */

    getAssets: flow(function* () {
      self.isLoading = true;
      let result = false;
      const assetApi = new AssetApi(self.environment.api);
      const response: ApiResponse<Array<AssetResult>> =
        yield assetApi.getAssets();

      if (response.kind === 'ok') {
        self.updateAssets(response.data);
        result = true;
      }

      self.isLoading = false;

      return result;
    }),

    checkAndGetValidCurrentAssetId: (currentAssetId: string): string => {
      const currentAsset = self.assets.get(currentAssetId);
      if (currentAsset === null || currentAsset === undefined)
        return self.assetList.length === 0 ? '' : self.assetList[0].id;
      else return currentAssetId;
    },
  }));
export interface AssetStore extends Instance<typeof AssetStoreModel> {}
export interface AssetStoreSnapshot
  extends SnapshotOut<typeof AssetStoreModel> {}
