import { ConnectionStatus } from '../../../stores';

export interface TwoPoleProps {
  LeftKeyValue: boolean;
  RightKeyValue: boolean;

  connectionStatus?: ConnectionStatus;
  onClickLeft: () => void;
  onClickRight: () => void;
  // onClickDeviceSetting?: () => void;
}
