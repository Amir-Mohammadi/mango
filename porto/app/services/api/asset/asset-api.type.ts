export class AssetResult {
  id: string;
  name: string;
  type: string;
  label: string;
  managerId: string;
  ownerId: string;
  phone: '';

  constructor() {
    this.id = '';
    this.name = '';
    this.type = '';
    this.label = '';
    this.managerId = '';
    this.ownerId = '';
    this.phone = '';
  }
}

export class ShareAssetInput {
  id = '';
  phone = '';
}

export class ShareAssetResult {
  sharingToken = '';
}

export class AssetVerify {
  sharingToken = '';
}

export class EditAsset {
  id = '';
  type = '';
  label = '';
}

export class DeleteAsset {
  id = '';
}

export class AddAsset {
  type = '';
  label = '';
}

export class VoidResult {}
