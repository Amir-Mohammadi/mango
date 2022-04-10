export interface DeviceProfileListItemProps {
  /**
   * profileId
   */
  profileId: number;

  /**
   * profileImage
   */
  profileImage: any;

  /**
   * profileName
   */
  profileName?: string;

  /**
   * onSelect
   */
  onSelect: (profileId: number) => void;
}
