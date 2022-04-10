import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useState } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { Header, Screen } from '../../../components';
import { NavigatorParamList } from '../../../navigators';
import { SoftAPV1ParamList } from '../../../navigators/ap-soft-v1-navigator';
import { useStores } from '../../../stores';
import { spacing } from '../../../theme';
import { styles } from './pre-confige-description-screen.styles';

type ConnectToDeviceHotspotScreenParams = CompositeScreenProps<
  StackScreenProps<SoftAPV1ParamList, 'preConfigDescription'>,
  StackScreenProps<NavigatorParamList>
>;

export const PreConfigDescription: React.FC<ConnectToDeviceHotspotScreenParams> =
  observer(props => {
    const { navigation, route } = props;
    const [isReadTheDescription, setIsReadTheDescription] = useState(false);
    const { deviceProfileStore } = useStores();

    const toggleReadTheDescription = () => {
      setIsReadTheDescription(!isReadTheDescription);
    };

    const handleOkButton = () => {
      const selectedDevice = deviceProfileStore.deviceProfilesView.find(
        model => model.id === route.params?.deviceModelId,
      );
      if (!selectedDevice?.profileRegex) {
        console.error('profile is not defined');
        return;
      }

      navigation.navigate('selectHouseWifiScreen', {
        deviceSSIDRegex: new RegExp(selectedDevice.profileRegex).source,
      });
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
              <Text style={HEADER}>
                Please Read Before Starting the Process
              </Text>

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
            onPress={handleOkButton}
          />
        </View>
      </Fragment>
    );
  });

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
