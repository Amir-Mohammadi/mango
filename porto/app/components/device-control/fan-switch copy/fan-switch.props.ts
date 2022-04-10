import { ConnectionStatus } from '../../../stores';

export interface FanSwitchProps {
  oneSpeedKeyValue: boolean;
  twoSpeedKeyValue: boolean;
  threeSpeedKeyValue: boolean;

  connectionStatus?: ConnectionStatus;
  onClickSpeedOne: () => void;
  onClickSpeedTwo: () => void;
  onClickSpeedThree: () => void;
  onClickDeviceSetting?: () => void;
}
