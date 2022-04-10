import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Divider, Image } from 'react-native-elements';
import { Text } from '../../../components/text/text';
import { ConnectionStatus } from '../../../stores';
import { Space } from '../../space/space';
import { FanSwitchProps } from '../fan-switch/fan-switch.props';
import { styles } from '../fan-switch/fan-switch.style';

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

const FanSwitch: React.FC<FanSwitchProps> = props => {
  const { connectionStatus, temperature } = props;

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
    if (props.oneSpeedKeyValue === true) {
      activateFirstButton();
    } else {
      deactivateFirstButton();
    }
  }, [props.oneSpeedKeyValue]);

  useEffect(() => {
    if (props.twoSpeedKeyValue === true) {
      activateSecondButton();
    } else {
      deactivateSecondButton();
    }
  }, [props.twoSpeedKeyValue]);

  useEffect(() => {
    if (props.threeSpeedKeyValue === true) {
      activateThirdButton();
    } else {
      deactivateThirdButton();
    }
  }, [props.threeSpeedKeyValue]);

  useEffect(() => {
    if (props.connectionStatus === ConnectionStatus.Connected) {
      activateConnectionStatus();
    } else {
      deactivateConnectionStatus();
    }
  }, [props.connectionStatus]);

  const onFirstButtonClickHandler = () => {
    props.onClickSpeedOne();
    changeDeviceStatus('1');
  };

  const onSecondButtonClickHandler = () => {
    props.onClickSpeedTwo();
    changeDeviceStatus('2');
  };
  const onThirdButtonClickHandler = () => {
    props.onClickSpeedThree();
    changeDeviceStatus('3');
  };

  useEffect(() => {
    if (props.threeSpeedKeyValue === true) {
      changeDeviceStatus('3');
      return;
    }

    if (props.twoSpeedKeyValue === true) {
      changeDeviceStatus('2');
      return;
    }
    if (props.oneSpeedKeyValue === true) {
      changeDeviceStatus('1');
      return;
    }
    changeDeviceStatus('off');
  }, [
    props.threeSpeedKeyValue,
    props.twoSpeedKeyValue,
    props.oneSpeedKeyValue,
  ]);

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
      <Space size={10} />
      <View style={styles.FAN_STATUS_CONTAINER}>
        <Image
          source={onSelectDeviceHandler(deviceStatus)}
          style={{ width: 213, height: 213, alignSelf: 'center' }}
        />
      </View>
      <Space size={15} />

      <View
        style={{ flexDirection: 'row-reverse', alignContent: 'space-between' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Image
            source={require('../../../assets/images/Timer.png')}
            style={{ width: 54, height: 54 }}
          />
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}> {'زمانسنج'}</Text>
        </View>

        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text
            style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 50 }}>
            {props.temperature}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 12 }}> دمای فعلی</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../assets/images/stopwatch.png')}
              style={{ width: 54, height: 54 }}
            />
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>
              تایمر
            </Text>
          </View>
        </View>
      </View>
      <Space size={20} />
      <View
        style={{
          borderRadius: 10,
          flexDirection: 'row',
          minHeight: 67,
        }}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: deviceStatus === 'off' ? '#ACBED2' : '#BDCFE3',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <Text> OFF</Text>
        </TouchableOpacity>
        <Divider style={{ borderWidth: 0.35, borderColor: '#CDDBEA' }} /> */}
        <TouchableOpacity
          style={{
            backgroundColor: deviceStatus === '1' ? '#60C1FF' : '#BDCFE3',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onFirstButtonClickHandler}>
          <Text> 1</Text>
        </TouchableOpacity>
        <Divider style={{ borderWidth: 0.35, borderColor: '#CDDBEA' }} />
        <TouchableOpacity
          style={{
            backgroundColor: deviceStatus === '2' ? '#60C1FF' : '#BDCFE3',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onSecondButtonClickHandler}>
          <Text> 2</Text>
        </TouchableOpacity>
        <Divider style={{ borderWidth: 0.35, borderColor: '#CDDBEA' }} />

        <TouchableOpacity
          style={{
            backgroundColor: deviceStatus === '3' ? '#60C1FF' : '#BDCFE3',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
          }}
          onPress={onThirdButtonClickHandler}>
          <Text> 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { FanSwitch };
