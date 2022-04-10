import { ConnectionStatus } from '../../../stores';

export interface FanSwitchProps {
  oneSpeedKeyValue: boolean;
  twoSpeedKeyValue: boolean;
  threeSpeedKeyValue: boolean;

  temperature: string;
  connectionStatus?: ConnectionStatus;
  onClickSpeedOne: () => void;
  onClickSpeedTwo: () => void;
  onClickSpeedThree: () => void;
  onClickDeviceSetting?: () => void;
}
