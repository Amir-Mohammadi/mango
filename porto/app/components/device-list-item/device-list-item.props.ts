import { Device } from '../../stores';

export interface DeviceListItemProps {
  device: Device;

  /**
   * onSelect
   */
  onSelect?: () => void;
}
