export interface headerProfileDateMenuProps {
  onMenuPress?(): void;

  profileImage?: string;

  profileNavigate?(): void;
  day?: string;

  month?: string;

  year?: string;

  changeAsset?(): void;

  currentAsset?: string;
  onLogoPress?(): void;
}
