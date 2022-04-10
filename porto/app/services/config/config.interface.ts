export interface Config {
  start(options: ConfigOptions): void;
  cancel(): ConfigStatus;

  status: ConfigStatus;
  onStatusChange(
    callback: (state: ConfigStatus) => void,
  ): void;
}

export type ConfigStatus =
  | {
      key: ConfigStatusKeys.Failed;
      errorMessage?: string;
    }
  | {
      key: ConfigStatusKeys.Finished;
      configResult?: ConfigResult;
    }
  | {
      key:
        | ConfigStatusKeys.Connected
        | ConfigStatusKeys.NotYetStarted
        | ConfigStatusKeys.SendingToDevice
        | ConfigStatusKeys.SendingToServer
        | ConfigStatusKeys.WaitingForDeviceResponse;
    };

export interface ConfigResult {}

export enum ConfigStatusKeys {
  /**
   * error
   */
  Failed,
  /**
   * connected to device
   */
  Connected,
  /**
   * sending info to device
   */
  SendingToDevice,
  SendingToServer,
  WaitingForDeviceResponse,
  NotYetStarted,
  Finished,
}

export interface ConfigOptions {
  credential: ConfigCredentials;
  deviceMacAddress: string;
}

export interface ConfigCredentials {
  ssid: string;
  password: string;
  ownerKey: string;
  accessToken: string;
}
