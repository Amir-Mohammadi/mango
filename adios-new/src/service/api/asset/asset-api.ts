import { AddAssetInput } from '@/service/types/AddAssetInput';
import { AddAssetResult } from '@/service/types/AddAssetResult';
import { EditAssetInput } from '@/service/types/EditAssetInput';
import { EditAssetResult } from '@/service/types/EditAssetResult';
import { GetAssetInput } from '@/service/types/GetAssetInput';
import { GetAssetResult } from '@/service/types/GetAssetResult';
import { GetAssetsResult } from '@/service/types/GetAssetsResult';
import { api } from '../core/api';


export const assetApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAssets: build.query<GetAssetsResult[], void>({
      query: (body) => ({
        url: `assets`,
        method: 'GET',
        body: body,
      }),
    }),
    addAsset: build.mutation<AddAssetResult, AddAssetInput>({
      query: (body) => ({
        url: `assets`,
        method: 'POST',
        body: body,
      }),
    }),
    getAsset: build.mutation<GetAssetResult, GetAssetInput>({
      query: (body) => ({
        url: `assets/${body.id}`,
        method: 'GET',
      }),
    }),
    editAsset: build.mutation<EditAssetResult, EditAssetInput>({
      query: (body) => ({
        url: `assets/${body.id}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const { useGetAssetsQuery, useAddAssetMutation, useGetAssetMutation } =
  assetApi;
