import { AddDeviceInput } from '@/service/types/AddDeviceInput';
import { AddDeviceResult } from '@/service/types/AddDeviceResult';
import { GetAllDevicesResult } from '@/service/types/GetAllDevices';
import { GetAllDevicesInput } from '@/service/types/GetAllDevicesInput';
import { GetDeviceInput } from '@/service/types/GetDeviceInput';
import { GetDeviceResult } from '@/service/types/GetDeviceResult';
import { api } from '../core/api';


export const assetApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllDevices: build.query<GetAllDevicesResult[], GetAllDevicesInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices`,
        method: 'GET',
      }),
    }),
    addDevice: build.mutation<AddDeviceResult, AddDeviceInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices`,
        method: 'POST',
        body: body,
      }),
    }),
    getDevice: build.query<GetDeviceResult, GetDeviceInput>({
      query: (body) => ({
        url: `assets/${body.assetId}/devices/${body.id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
  useAddDeviceMutation,
  useGetDeviceQuery,
} = assetApi;
