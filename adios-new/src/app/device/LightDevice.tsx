import { LightDevice1x } from '../device/LightDevice1x';
import { LightDevice2x } from '../device/LightDevice2x';

export interface IButtonIconProps {
  charge?: boolean;
  beep?: boolean;
  setting?: boolean;
  buttonOne?: boolean;
  buttonTwo?: boolean;
  buttonThree?: boolean;

  scale: '1x' | '2x';

  onClickCharge?: () => void;
  onClickBeep?: () => void;
  onClickButtonOne?: () => void;
  onClickButtonTwo?: () => void;
  onClickButtonThree?: () => void;
}

export const LightDevice: React.FC<IButtonIconProps> = (props) => {
  return (
    <div>
      {props.scale === '1x' ? (
        <LightDevice1x {...props} />
      ) : (
        <LightDevice2x {...props} />
      )}
    </div>
  );
};
