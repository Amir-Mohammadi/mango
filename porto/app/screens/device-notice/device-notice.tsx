import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useState } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Button, CheckBox, Icon, Text } from 'react-native-elements';
import { Header, Screen } from '../../components';
import { goBack } from '../../navigators';
import { DeviceConfigNavigatorParamList } from '../../navigators/device-config-navigator';
import { namedSpacing, spacing } from '../../theme';
import { styles } from './device-notice.styles';

export const DeviceNoticeScreen: React.FC<
  StackScreenProps<DeviceConfigNavigatorParamList, 'deviceNotice'>
> = observer(props => {
  const { navigation } = props;
  const [isReadTheDescription, setIsReadTheDescription] = useState(false);

  const toggleReadTheDescription = () => {
    setIsReadTheDescription(!isReadTheDescription);
  };

  return (
    <Fragment>
      <Header
        headerText="Device Notice"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <View style={CONTAINER}>
        <Screen style={styles.ROOT} variant={'fixed'}>
          <View style={styles.LIST_CONTAINER}>
            <Text style={HEADER}>Please Read Before Starting the Process</Text>

            <Text style={TEXT}>
              {
                '1. Turn Off The VPN \n2. Put Device In the Config mode by pressing the wifi button for 3 seconds \n3. make sure you are close to the device as possible'
              }
            </Text>

            <View style={{ marginVertical: spacing[3] }} />

            <CheckBox
              center
              onPress={toggleReadTheDescription}
              title="I Read the description"
              checked={isReadTheDescription}
            />
          </View>
        </Screen>
        <Button
          disabled={!isReadTheDescription}
          title="OK"
          containerStyle={BUTTON_CONTAINER}
          onPress={() => {
            navigation.navigate('selectRouter', {
              profileRegex: '2',
            });
          }}
        />
      </View>
    </Fragment>
  );
});

export const DeviceNoticeScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Notice',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        onPress={() => {
          goBack();
        }}
        name="arrowleft"
        type="ant-design"
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};

const BUTTON_CONTAINER: ViewStyle = {
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  padding: 20,
};
const CONTAINER: ViewStyle = { flex: 1 };
const HEADER: TextStyle = {
  alignSelf: 'center',
  fontSize: 18,
  fontWeight: 'bold',
};
const TEXT: TextStyle = {
  alignSelf: 'center',
  fontSize: 16,
  fontWeight: 'normal',
};
