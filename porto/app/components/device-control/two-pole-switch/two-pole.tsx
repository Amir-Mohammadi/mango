import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'react-native-elements';
import { Shadow } from 'react-native-shadow-2';
import { ConnectionStatus } from '../../../stores';
import { Space } from '../../space/space';
import { TwoPoleProps } from './two-pole.props';
import { styles } from './two-pole.style';
const ACTIVE_ICON_COLOR = '#ffffff';
const INACTIVE_ICON_COLOR = '#707070';
const ACTIVE_BORDER_COLOR = '#f0f0f0';
const INACTIVE_BORDER_COLOR = '#707070';
const ACTIVE_BACKGROUND_COLOR = '#2ba3ff';
const INACTIVE_BACKGROUND_COLOR = '#ffffff';

type SwitchButtonStyle = {
  iconName?: string;
  iconColor: string;
  backgroundColor: string;
  borderColor: string;
};

const TwoPole: React.FC<TwoPoleProps> = props => {
  const { connectionStatus } = props;

  const [firstButtonStyle, setFirstButtonStyle] = useState<SwitchButtonStyle>({
    iconColor: INACTIVE_ICON_COLOR,
    backgroundColor: INACTIVE_BACKGROUND_COLOR,
    borderColor: INACTIVE_BORDER_COLOR,
  });

  const [secondButtonStyle, setSecondButtonStyle] = useState<SwitchButtonStyle>(
    {
      iconColor: INACTIVE_ICON_COLOR,
      backgroundColor: INACTIVE_BACKGROUND_COLOR,
      borderColor: INACTIVE_BORDER_COLOR,
    },
  );

  const [thirdButtonStyle, setThirdButtonStyle] = useState<SwitchButtonStyle>({
    iconColor: INACTIVE_ICON_COLOR,
    backgroundColor: INACTIVE_BACKGROUND_COLOR,
    borderColor: INACTIVE_BORDER_COLOR,
  });

  const getButtonAvatarStyle = (buttonStyle: SwitchButtonStyle): ViewStyle => {
    return {
      borderWidth: 1.5,
      borderColor: buttonStyle.borderColor,
      backgroundColor: buttonStyle.backgroundColor,
    };
  };

  const [connectionStatusStyle, setConnectionStatusStyle] =
    useState<SwitchButtonStyle>({
      iconColor: INACTIVE_ICON_COLOR,
      backgroundColor: INACTIVE_BACKGROUND_COLOR,
      borderColor: INACTIVE_BORDER_COLOR,
    });

  const activateFirstButton = () => {
    setFirstButtonStyle({
      iconColor: ACTIVE_ICON_COLOR,
      backgroundColor: ACTIVE_BACKGROUND_COLOR,
      borderColor: ACTIVE_BORDER_COLOR,
    });
  };

  const deactivateFirstButton = () => {
    setFirstButtonStyle({
      iconColor: INACTIVE_ICON_COLOR,
      backgroundColor: INACTIVE_BACKGROUND_COLOR,
      borderColor: INACTIVE_BORDER_COLOR,
    });
  };

  const activateSecondButton = () => {
    setSecondButtonStyle({
      iconColor: ACTIVE_ICON_COLOR,
      backgroundColor: ACTIVE_BACKGROUND_COLOR,
      borderColor: ACTIVE_BORDER_COLOR,
    });
  };

  const deactivateSecondButton = () => {
    setSecondButtonStyle({
      iconColor: INACTIVE_ICON_COLOR,
      backgroundColor: INACTIVE_BACKGROUND_COLOR,
      borderColor: INACTIVE_BORDER_COLOR,
    });
  };

  const activateThirdButton = () => {
    setThirdButtonStyle({
      iconColor: ACTIVE_ICON_COLOR,
      backgroundColor: ACTIVE_BACKGROUND_COLOR,
      borderColor: ACTIVE_BORDER_COLOR,
    });
  };

  const deactivateThirdButton = () => {
    setThirdButtonStyle({
      iconColor: INACTIVE_ICON_COLOR,
      backgroundColor: INACTIVE_BACKGROUND_COLOR,
      borderColor: INACTIVE_BORDER_COLOR,
    });
  };

  const activateConnectionStatus = () => {
    setConnectionStatusStyle({
      iconName: 'wifi',
      iconColor: ACTIVE_ICON_COLOR,
      backgroundColor: ACTIVE_BACKGROUND_COLOR,
      borderColor: ACTIVE_BORDER_COLOR,
    });
  };

  const deactivateConnectionStatus = () => {
    setConnectionStatusStyle({
      iconName: 'wifi-off',
      iconColor: INACTIVE_ICON_COLOR,
      backgroundColor: INACTIVE_BACKGROUND_COLOR,
      borderColor: INACTIVE_BORDER_COLOR,
    });
  };

  useEffect(() => {
    if (props.LeftKeyValue === true) {
      activateFirstButton();
    } else {
      deactivateFirstButton();
    }
  }, [props.LeftKeyValue]);

  useEffect(() => {
    if (props.RightKeyValue === true) {
      activateSecondButton();
    } else {
      deactivateSecondButton();
    }
  }, [props.RightKeyValue]);

  useEffect(() => {
    if (props.connectionStatus === ConnectionStatus.Connected) {
      activateConnectionStatus();
    } else {
      deactivateConnectionStatus();
    }
  }, [props.connectionStatus]);

  const onLeftButtonClickHandler = () => {
    props.onClickLeft();
    changeDeviceStatus('1');
  };

  const onRightButtonClickHandler = () => {
    props.onClickRight();
    changeDeviceStatus('2');
  };

  useEffect(() => {
    if (props.RightKeyValue === true) {
      changeDeviceStatus('2');
      return;
    }
    if (props.LeftKeyValue === true) {
      changeDeviceStatus('1');
      return;
    }
    changeDeviceStatus('off');
  }, [props.RightKeyValue, props.LeftKeyValue]);

  const [deviceStatus, changeDeviceStatus] = useState<'off' | '1' | '2' | '3'>(
    'off',
  );
  const onSelectDeviceHandler = (deviceStatus: string) => {
    switch (deviceStatus) {
      case 'off':
        return require('../../../assets/images/fan/fan-off.png');
      case '1':
        return require('../../../assets/images/fan/fan-one.png');
      case '2':
        return require('../../../assets/images/fan/fan-two.png');
      case '3':
        return require('../../../assets/images/fan/fan-three.png');
      default:
        return require('../../../assets/images/fan/fan-off.png');
    }
  };

  return (
    <View style={styles.CONTAINER}>
      <Shadow
        distance={props.LeftKeyValue ? 15 : 1}
        startColor={'#40BFCF'}
        // viewStyle={{ paddingHorizontal: 10 }}
      >
        <TouchableOpacity
          style={{
            width: 140,
            height: 280,
            backgroundColor: '#3E74CB',
            shadowColor: 'yellow',
            flexDirection: 'column-reverse',
            alignItems: 'center',
          }}
          onPress={onLeftButtonClickHandler}>
          <Image
            source={
              props.LeftKeyValue
                ? require('../../../assets/images/power-on.png')
                : require('../../../assets/images/power-off.png')
            }
            style={{ width: 60, height: 65 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Shadow>
      <Space horizontal />
      <Space horizontal />
      <Space horizontal />

      <Shadow distance={props.RightKeyValue ? 15 : 1} startColor={'#40BFCF'}>
        <TouchableOpacity
          style={{
            width: 140,
            height: 280,
            backgroundColor: '#3E74CB',

            flexDirection: 'column-reverse',
            alignItems: 'center',
          }}
          onPress={onRightButtonClickHandler}>
          <Image
            source={
              props.RightKeyValue
                ? require('../../../assets/images/power-on.png')
                : require('../../../assets/images/power-off.png')
            }
            style={{ width: 60, height: 65 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Shadow>
    </View>
  );
};

export { TwoPole };
