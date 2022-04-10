export interface DeviceProfile {
  id: number;
  profileName: string;
  profileRegex: string;
  profileImage: string;
}

export class DeviceResult {
  constructor() {
    this.id = '';
    this.name = '';
    this.label = '';
    this.type = '';
    this.managerId = '';
    this.assetId = '';
    this.zone = null;
    this.isOwner = false;
    this.deviceProfileId = '';
  }

  id: string;
  name: string;
  label: string;
  type: string;
  managerId: string;
  assetId: string;
  zone: string | null;
  deviceProfileId: string;
  isOwner: boolean;
}

export interface EditDevice {
  deviceIdentifier: string;
  label: string;
  type: string;
  zone: string | null;
  deviceProfileId: string;
}

export class DeviceConnectionPairKeyResult {
  constructor() {
    this.name = '';
    this.pairKey = '';
  }

  name: string;
  pairKey: string;
}
