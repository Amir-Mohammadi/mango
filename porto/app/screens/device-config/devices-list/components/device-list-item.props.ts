export interface DeviceListItem {
  upText?: string;

  downText?: string;
  image: string | number;
  onPress?(): void;
}
