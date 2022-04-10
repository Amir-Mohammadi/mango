import React, { useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { ConnectionStatus } from '../../../stores';
import { ThreePoleSwitchProps } from './three-pole-switch.props';
import { styles } from './three-pole-switch.style';

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

const ThreePoleSwitch: React.FC<ThreePoleSwitchProps> = props => {
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
    if (props.firstPoleKeyValue === true) {
      activateFirstButton();
    } else {
      deactivateFirstButton();
    }
  }, [props.firstPoleKeyValue]);

  useEffect(() => {
    if (props.secondPoleKeyValue === true) {
      activateSecondButton();
    } else {
      deactivateSecondButton();
    }
  }, [props.secondPoleKeyValue]);

  useEffect(() => {
    if (props.thirdPoleKeyValue === true) {
      activateThirdButton();
    } else {
      deactivateThirdButton();
    }
  }, [props.thirdPoleKeyValue]);

  useEffect(() => {
    if (props.connectionStatus === ConnectionStatus.Connected) {
      activateConnectionStatus();
    } else {
      deactivateConnectionStatus();
    }
  }, [props.connectionStatus]);

  const onFirstButtonClickHandler = () => {
    props.onClickFirstPole();
  };

  const onSecondButtonClickHandler = () => {
    props.onClickSecondPole();
  };
  const onThirdButtonClickHandler = () => {
    props.onClickThirdPole();
  };
  return (
    <View style={styles.SWITCH_CONTAINER}>
      <View style={styles.SWITCH_SETTING_CONTAINER}>
        <Avatar
          rounded
          size={60}
          icon={{
            name: connectionStatusStyle.iconName,
            type: 'feather',
            color: connectionStatusStyle.iconColor,
          }}
          containerStyle={getButtonAvatarStyle(connectionStatusStyle)}
        />
        <Avatar
          onPress={() => {
            props.onClickDeviceSetting && props.onClickDeviceSetting();
          }}
          rounded
          size={60}
          icon={{
            name: 'md-settings',
            type: 'ionicon',
            color: '#707070',
          }}
          containerStyle={styles.BUTTON_AVATAR_CONTAINER}
        />
      </View>
      <View style={styles.SWITCH_AVATAR_CONTAINER}>
        <Image
          style={styles.IMAGE}
          source={require('../../../assets/ThreePole.png')}
        />
      </View>
      <View style={styles.SWITCH_CONTROL_CONTAINER}>
        <Avatar
          onPress={onFirstButtonClickHandler}
          rounded
          size={90}
          icon={{
            name: 'power',
            type: 'feather',
            color: firstButtonStyle.iconColor,
          }}
          containerStyle={getButtonAvatarStyle(firstButtonStyle)}
        />

        <Avatar
          onPress={onSecondButtonClickHandler}
          rounded
          size={90}
          icon={{
            name: 'power',
            type: 'feather',
            color: secondButtonStyle.iconColor,
          }}
          containerStyle={getButtonAvatarStyle(secondButtonStyle)}
        />
        <Avatar
          onPress={onThirdButtonClickHandler}
          rounded
          size={90}
          icon={{
            name: 'power',
            type: 'feather',
            color: thirdButtonStyle.iconColor,
          }}
          containerStyle={getButtonAvatarStyle(thirdButtonStyle)}
        />
      </View>
    </View>
  );
};

export { ThreePoleSwitch };
