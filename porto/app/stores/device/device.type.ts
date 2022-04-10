export enum ConnectionStatus {
  Disconnected = 0,
  Connecting = 1,
  Connected = 2,
  ConnectionFailed = 3,
}

export enum CommonDeviceInfoKey {
  lastConnectTime = 'lastConnectTime',
  lastDisconnectTime = 'lastDisconnectTime',
  router = 'AP',
  subscriptionId = 'subscriptionId',
}

export enum DeviceType {
  undefined = '',
  fanSwitchV1 = 'parlar.fan_switch_with_wifi.v1',
  threePoleSwitchV1 = 'parlar.three_pole_switch_with_wifi.v1',
  twoPoleSwitchV1 = 'parlar.two_pole_switch_with_wifi.v1',
  tvV1 = 'parlar.tv_with_wifi.v1',
  lightV1 = 'parlar.light_with_wifi.v1',
}
