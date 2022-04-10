import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components/text/text';
import { spacing } from '../../../theme';
import { SmallCardProps } from './small-card.props';

export function SmallCard(props: SmallCardProps) {
  const { text, onPress } = props;
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row-reverse',
          borderRadius: 8,
          paddingHorizontal: spacing[4],
          alignContent: 'space-between',
          justifyContent: 'space-between',
          minHeight: 50,
          elevation: 5,
          marginTop: 5,
          marginHorizontal: 5,
          marginBottom: 10,
          backgroundColor: 'white',
        }}
        onPress={props.onPress}>
        <Text
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'center',
            flex: 12,
            fontSize: 13,
          }}>
          {props.text}
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            flex: 1,
            padding: 15,
          }}>
          <Image
            source={require('../../../assets/images/navigate.png')}
            style={{
              height: 10,
              width: 5,
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
