import { ConnectionStatus } from '../../../stores';

export interface ThreePoleSwitchProps {
  firstPoleKeyValue: boolean;
  secondPoleKeyValue: boolean;
  thirdPoleKeyValue: boolean;

  connectionStatus?: ConnectionStatus;
  onClickFirstPole: () => void;
  onClickSecondPole: () => void;
  onClickThirdPole: () => void;
  onClickDeviceSetting?: () => void;
}
