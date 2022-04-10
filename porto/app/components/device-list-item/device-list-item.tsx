import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TextTicker from 'react-native-text-ticker';
import ToggleSwitch from 'toggle-switch-react-native';
import { AirConditioner } from '../../constants/svgs/air-conditioner';
import { LightSvg } from '../../constants/svgs/light';
import { TwoPole } from '../../constants/svgs/two-pole';
import { DeviceType } from '../../stores';
import { Space } from '../space/space';
import { DeviceListItemProps } from './device-list-item.props';
import { styles } from './device-list-item.style';

export const DeviceListItem: React.FC<DeviceListItemProps> = observer(props => {
  const getDeviceImage = (
    deviceType: DeviceType | null,
    status: boolean,
  ): JSX.Element | null => {
    switch (deviceType) {
      case DeviceType.fanSwitchV1:
        return <AirConditioner color={status ? 'white' : '#6990BA'} />;

      case DeviceType.threePoleSwitchV1:
        return <Image source={require('../../assets/images/light.png')} />;
      case DeviceType.tvV1:
        return <Image source={require('../../assets/images/tv.png')} />;
      case DeviceType.lightV1:
        return <LightSvg color={status ? 'white' : '#6990BA'} />;
      case DeviceType.twoPoleSwitchV1:
        return <TwoPole color={status ? 'white' : '#6990BA'} />;

      default:
        return (
          <Icon
            type="font-awesome"
            name={'fa-thin fa-circle-question'}
            color={status ? 'white' : '#6990BA'}
            size={40}
          />
        );
    }
  };

  const [status, setStatus] = useState(true);

  const deviceStatusMapName = (state: boolean) => {
    if (state) return 'روشن';
    return 'خاموش';
  };

  return (
    <LinearGradient
      colors={status ? ['#567DF8', '#5DBBFC'] : ['white', 'white']}
      style={status ? styles.ON_LINEARGRADIENT : styles.OFF_LINEARGRADIENT}>
      <Pressable onPress={props.onSelect} style={styles.DEVICE_ITEM}>
        <View style={styles.CARD}>
          <View style={styles.CARD_RIGHT_SIDE}>
            <ToggleSwitch
              isOn={status}
              onColor="#1CD848"
              offColor="#C4D4E4"
              size="small"
              onToggle={() => setStatus(!status)}
            />
            <Space />
            <TextTicker
              style={status ? styles.ON_DEVICE_NAME : styles.OFF_DEVICE_NAME}
              duration={3000}
              loop
              repeatSpacer={25}
              isRTL={true}>
              {props.device.label}
            </TextTicker>

            <Space />
            <TextTicker
              style={
                status
                  ? styles.ON_DEVICE_ZONE_TICKER
                  : styles.OFF_DEVICE_ZONE_TICKER
              }
              duration={5000}
              loop
              repeatSpacer={25}
              isRTL={true}>
              <Text
                // style={{ color: status ? 'white' : '#6990BA', fontSize: 12 }}
                style={status ? styles.ON_DEVICE_ZONE : styles.OFF_DEVICE_ZONE}>
                {props.device.zone}
              </Text>
            </TextTicker>
          </View>

          <View style={styles.CARD_LEFT_SIDE}>
            {getDeviceImage(props.device.deviceType, status)}
            <Space />
            <Text
              style={
                status ? styles.ON_DEVICE_STATUS : styles.OFF_DEVICE_STATUS
              }>
              {deviceStatusMapName(status)}
            </Text>
          </View>
        </View>
      </Pressable>
    </LinearGradient>
  );
});
