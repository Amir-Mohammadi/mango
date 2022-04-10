import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    ImageSourcePropType,
    StatusBar,
    View
} from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../../components';
import { Space } from '../../../components/space/space';
import { NavigatorParamList } from '../../../navigators';
import { DeviceConfigNavigatorParamList } from '../../../navigators/device-config-navigator';
import { spacing } from '../../../theme';

const DEVICE_CONFIG_TIMEOUT = 60000;
export const ConnectToDeviceScreen: React.FC<
  CompositeScreenProps<
    StackScreenProps<DeviceConfigNavigatorParamList, 'connectToDevice'>,
    StackScreenProps<NavigatorParamList>
  >
> = observer(props => {
  const EXPIRATION_TIME = 120;
  const [seconds, setSeconds] = useState(EXPIRATION_TIME);
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(myInterval);
        setIsCodeExpired(true);
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const [step, changeStep] = useState<1 | 2 | 3>(1);

  const stepsImage = (): ImageSourcePropType => {
    if (step === 1) return require('../../../assets/images/step1.png');
    else if (step === 2) return require('../../../assets/images/step2.png');
    return require('../../../assets/images/step3.png');
  };

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../../assets/images/Background-full.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Screen backgroundColor="transparent">
            <View
              style={{
                marginHorizontal: spacing[4],
                marginTop: spacing[5],
                marginBottom: spacing[6],
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: spacing[4],
                paddingTop: spacing[4],
                height: 657,
                flex: 1,
              }}>
              <Space size={20} />

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {'درج اطلاعات وای فای'}
              </Text>
              <Space />
              <Divider
                style={{ width: '40%', alignSelf: 'center' }}
                width={2}
                color={'#5A97FB'}
              />
              <Space />
              <Space />
              <Space />
              <Image
                source={require('../../../assets/images/scanning.png')}
                resizeMode="contain"
                style={{ height: 254, width: 254, alignSelf: 'center' }}
              />
              <Space size={20} />

              <Text style={{ textAlign: 'center' }}>
                {seconds + '\n زمان باقی مانده'}
              </Text>
              <Space size={40} />
              <Space size={40} />

              <Image
                source={stepsImage()}
                resizeMode="contain"
                style={{ height: 25, width: 216, alignSelf: 'center' }}
              />
            </View>
          </Screen>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});
