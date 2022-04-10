import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-elements';
import { Header, Screen } from '../../../components';
import { goBack, NavigatorParamList } from '../../../navigators';
import { SoftAPV1ParamList } from '../../../navigators/ap-soft-v1-navigator';
import { APSoftConfig } from '../../../services/config/ap-soft';
import {
    ConfigStatus,
    ConfigStatusKeys
} from '../../../services/config/config.interface';
import { useStores } from '../../../stores';
import { color } from '../../../theme';
import { styles } from './device-config-screen.style';

type DeviceConfigScreenParams = CompositeScreenProps<
  StackScreenProps<SoftAPV1ParamList, 'deviceConfigScreen'>,
  StackScreenProps<NavigatorParamList>
>;

export const DeviceConfigScreen: React.FC<DeviceConfigScreenParams> = observer(
  props => {
    const { routerStore } = useStores();
    const apSoftConfigService = useMemo(() => new APSoftConfig(), []);
    const [counter, setCounter] = useState(apSoftConfigService.counterTime);
    const [configStep, setConfigStep] = useState<ConfigStatus>(
      apSoftConfigService.status,
    );

    useFocusEffect(
      useCallback(() => {
        console.log('selected wifi: ', routerStore.selectedRouter);

        startConfigDevice();
        return () => {
          cancelConfigDevice();
        };
      }, []),
    );

    const cancelConfigDevice = () => {
      apSoftConfigService.cancel();
    };

    const startConfigDevice = () => {
      apSoftConfigService.start();
      apSoftConfigService.onStatusChange(updateStatus);
      apSoftConfigService.onCounterUpdate(updateCounter);
    };

    const updateCounter = (timeInSec: number) => {
      setCounter(timeInSec);
    };

    const isFinished =
      configStep.key === ConfigStatusKeys.Failed ||
      configStep.key === ConfigStatusKeys.Finished;
    console.log('is finished', isFinished);

    const updateStatus = (status: ConfigStatus) => {
      // setConfigStep(status);

      if (status.key === ConfigStatusKeys.Failed) {
        // console.error(status.errorMessage ?? 'Error');
      }
    };

    const handleBackButton = () => {
      goBack();
    };

    return (
      <Fragment>
        <Header
          headerText="Device Configuration"
          leftIcon="back"
          onLeftPress={handleBackButton}
        />
        <View style={styles.ROOT}>
          <Screen style={styles.ROOT} variant="fixed">
            <View style={styles.CONFIG_IMAGE_CONTAINER}>
              <Avatar
                containerStyle={styles.CONFIG_IMAGE}
                size={300}
                rounded
                icon={{
                  name: stepIconMap[ConfigStatusKeys[configStep.key]],
                  type: 'ant-design',
                  color: '#707070',
                }}
              />
            </View>

            {isFinished && (
              <View style={styles.CONFIG_RESULT_CONTAINER}>
                <Text style={styles.CONFIG_RESULT_TEXT}>
                  {stepMessageMap[ConfigStatusKeys[configStep.key]]}
                </Text>
              </View>
            )}

            {!isFinished && (
              <View>
                <Text style={styles.TEXT}>{counter}</Text>
                <View style={styles.CONFIG_STEP_CONTAINER}>
                  <View style={styles.CONFIG_STEP_Loading}>
                    <ActivityIndicator size={30} color={color.palette.black} />
                  </View>
                  <View style={styles.CONFIG_STEP_DESCRIPTION}>
                    <Text style={styles.CONFIG_STEP_TEXT}>
                      {stepMessageMap[ConfigStatusKeys[configStep.key]]}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Screen>
          <Button
            containerStyle={styles.BUTTON_CONTAINER}
            buttonStyle={styles.BUTTON}
            disabled={!isFinished}
            title={configStep.key === ConfigStatusKeys.Failed ? 'Retry' : 'Ok'}
            onPress={handleBackButton}
          />
        </View>
      </Fragment>
    );
  },
);

const stepIconMap: { [key in keyof typeof ConfigStatusKeys]: string } = {
  Connected: 'setting',
  Failed: 'close',
  Finished: 'check',
  NotYetStarted: 'setting',
  SendingToDevice: 'setting',
  SendingToServer: 'setting',
  WaitingForDeviceResponse: 'setting',
};

const stepMessageMap: { [key in keyof typeof ConfigStatusKeys]: string } = {
  Connected: 'Connected',
  Failed: 'Failed',
  Finished: 'Finished',
  NotYetStarted: 'NotYetStarted',
  SendingToDevice: 'SendingToDevice',
  SendingToServer: 'SendingToServer',
  WaitingForDeviceResponse: 'WaitingForDeviceResponse',
};
