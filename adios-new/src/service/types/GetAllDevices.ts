export interface GetAllDevicesResult {
  id: string;
  name: string;
  label: string;
  type: string;
  managerId: string;
  assetId: string;
  assetLabel: string;
  zone: string;
  deviceData: {
    configuration: {
      type: string;
    };
    transportConfiguration: {
      type: string;
    };
  };
  deviceProfileId: string;
}
