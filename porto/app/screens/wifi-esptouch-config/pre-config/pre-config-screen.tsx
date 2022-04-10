import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { Screen } from '../../../components/screen/screen';
import { Space } from '../../../components/space/space';
import { NavigatorParamList } from '../../../navigators';
import { ESPTouchConfigParamList } from '../../../navigators/asptouch-navigator';
import { useStores } from '../../../stores';
import { spacing } from '../../../theme';

type PreConfigScreenProps = CompositeScreenProps<
  StackScreenProps<ESPTouchConfigParamList, 'preConfig'>,
  StackScreenProps<NavigatorParamList>
>;

export const PreConfig: React.FC<PreConfigScreenProps> = observer(props => {
  const { deviceStore } = useStores();
  const { navigation } = props;

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
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {'حالت تنظیم اولیه'}
              </Text>
              <Space />
              <Divider
                style={{ width: '40%', alignSelf: 'center' }}
                width={2}
                color={'#5A97FB'}
              />
              <Space />
              <Text style={{ fontSize: 16, textAlign: 'center' }}>
                {'افزودن دستگاه به: '}
                {deviceStore.currentAsset?.label}
              </Text>
              <Space />
              <Space />
              <Space />
              <View style={{ alignItems: 'center' }}>
                <LottieView
                  style={{ width: 126, height: 206 }}
                  source={require('../../../assets/animations/config-basic-setting.json')}
                  autoPlay
                  loop
                />
              </View>
              <Space size={15} />
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {'دکمه دستگاه را به مدت 5 ثانیه نگه دارید'}
                </Text>
                <Space size={12} />
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                  {'دستگاه به صورت ممتد چشمک خواهد زد'}
                </Text>
              </View>
              <Space />
              <GradientButton
                title={'ادامه'}
                style={{ marginTop: spacing[7], marginBottom: spacing[6] }}
                onPress={() => navigation.navigate('selectHomeWifi')}
              />
            </View>
          </Screen>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});
