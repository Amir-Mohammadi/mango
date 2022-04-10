import React from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Space } from '../../../../components/space/space';
import { Text } from '../../../../components/text/text';
import { spacing } from '../../../../theme';
import { DeviceListItem as DeviceListItemProps } from './device-list-item.props';

export function DeviceListItem(props: DeviceListItemProps) {
  const { upText, downText, image, onPress } = props;
  return (
    <View>
      <ImageBackground
        source={require('../../../../assets/images/device-card.png')}
        resizeMode="cover">
        <TouchableOpacity
          style={{
            padding: spacing[4],
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}
          onPress={props.onPress}>
          <Image
            source={
              typeof props.image === 'number'
                ? props.image
                : { uri: props.image }
            }
            style={{ width: 75, height: 75 }}
            resizeMode="contain"
          />
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: spacing[6],
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
                textAlign: 'right',
              }}>
              {props.upText}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: spacing[6],
                fontSize: 18,
                color: 'white',
                textAlign: 'right',
              }}>
              {props.downText}
            </Text>
          </View>
          <Space size={20} />
          <Space size={30} />
          <Space size={20} />
          <Space size={20} />
        </TouchableOpacity>
      </ImageBackground>
      <Space />
      <Space />
    </View>
  );
}
