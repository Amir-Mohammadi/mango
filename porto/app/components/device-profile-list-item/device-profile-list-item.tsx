import React from 'react';
import { Image, ListItem } from 'react-native-elements';
import { DeviceProfileListItemProps } from './device-profile-list-item.props';
import { styles } from './device-profile-list-item.style';

export const DeviceProfileListItem: React.FC<DeviceProfileListItemProps> =
  props => {
    return (
      <ListItem
        bottomDivider
        onPress={() => {
          props.onSelect(props.profileId);
        }}>
        {!!props.profileImage && (
          <Image
            style={styles.IMAGE}
            source={require('../../assets/fan.png')}
          />
        )}

        <ListItem.Content>
          <ListItem.Title>{props.profileName}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={30} />
      </ListItem>
    );
  };
