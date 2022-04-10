import { CommonDeviceInfoKey, Device } from '../../stores';

export class DeviceSubscription {
  private deviceSubscription: Map<number, string>;
  private devices: Array<Device>;
  public subscriptionMessage: string;

  constructor(devices: Device[]) {
    this.deviceSubscription = new Map();
    this.devices = devices;
    this.subscriptionMessage = '';
    this.generateDeviceSubscriptionMessage();
  }

  private generateDeviceSubscriptionMessage(): void {
    let index = 1;
    const messages: any[] = [];
    this.devices.forEach(item => {
      messages.push(this.generateRawMessage(item.id, index));
      this.deviceSubscription.set(index, item.id);
      index++;
    });
    this.subscriptionMessage = this.generateSubscriptionMessage(messages);
    index = 1;
  }

  private generateRawMessage(deviceId: string, index: number): any {
    const subscribeMessage = {
      entityType: 'DEVICE',
      entityId: deviceId,
      cmdId: index,
      keys: [
        CommonDeviceInfoKey.lastConnectTime,
        CommonDeviceInfoKey.lastDisconnectTime,
      ].join(','),
    };

    return subscribeMessage;
  }

  private generateSubscriptionMessage(rawAttrMessage: any[]): string {
    const subscribeMessage = {
      tsSubCmds: [],
      historyCmds: [],
      attrSubCmds: rawAttrMessage,
    };
    return JSON.stringify(subscribeMessage);
  }

  public parseMessage(message: string): Map<string, string> {
    const data = JSON.parse(message);
    const map = new Map();
    const deviceId = this.deviceSubscription.get(data.subscriptionId);
    map.set(deviceId, message);
    return map;
  }
}
