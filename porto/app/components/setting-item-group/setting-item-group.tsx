import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { SettingItemGroupProps } from './setting-item-group.props';
import { styles } from './setting-item-group.style';

const SettingItemGroup: React.FC<SettingItemGroupProps> = props => {
  return (
    <View style={styles.CARD_CONTAINER}>
      {props.title && (
        <View style={styles.CARD_HEADER_CONTAINER}>
          <Text style={styles.CARD_HEADER_TEXT}>{props.title}</Text>
        </View>
      )}
      <View style={props.title ? styles.CARD_BODY_CONTAINER : {}}>
        {props.children}
      </View>
      {props.showBottomLine && (
        <View style={styles.CARD_FOOTER_CONTAINER}>
          <Divider />
        </View>
      )}
    </View>
  );
};

export { SettingItemGroup };
