import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text } from '../../components/text/text';
import { useStores } from '../../stores';
import { spacing } from '../../theme';
import { headerProfileDateMenuProps } from './header_profile_date_menu.props';
/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function HeaderProfileDateMenu(props: headerProfileDateMenuProps) {
  const { deviceStore } = useStores();
  const {
    profileImage,
    onMenuPress,
    day,
    month,
    year,
    changeAsset,
    profileNavigate,
  } = props;
  return (
    <View
      style={{
        height: 65,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
      }}>
      <TouchableOpacity
        style={{ marginLeft: spacing[3] }}
        onPress={props.profileNavigate}>
        <Avatar
          rounded
          containerStyle={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: 65,
            flex: 1,
          }}
          imageProps={{
            style: {
              width: 65,
              borderRadius: 130,
              resizeMode: 'contain',
            },
          }}
          renderPlaceholderContent={
            <Image source={require('../../assets/personal_2.png')} />
          }
          source={{
            uri: props.profileImage,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: 155,
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white' }}>
              {props.day}
              {props.month}
              {props.year}
            </Text>
            <Image
              source={require('../../assets/images/weather.png')}
              style={{ width: 29, height: 27 }}
            />
          </View>

          <View>
            <TouchableOpacity
              style={{
                borderRadius: 18,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '65%',
                alignSelf: 'center',
              }}
              onPress={props.changeAsset}>
              <Text
                style={{
                  textAlign: 'center',
                  marginLeft: spacing[1],
                  fontSize: 11,
                  color: '#6184C7',
                  flex: 10,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {props.currentAsset}
              </Text>
              <Image
                source={require('../../assets/images/expand.png')}
                style={{
                  resizeMode: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  flex: 1,
                  marginRight: spacing[1],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={props.onMenuPress}>
        <Image
          source={require('../../assets/images/menu.png')}
          style={{
            height: 25,
            width: 27,
            alignSelf: 'flex-end',
            flex: 1,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
