import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';

export const SplashScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'splash'>
> = observer(props => {
  const { authStore } = useStores();
  const EXPIRATION_TIME = 2;
  const [seconds, setSeconds] = useState(EXPIRATION_TIME);
  const [timeUp, setTimeUp] = useState(false);
  const { navigation } = props;
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(myInterval);
        setTimeUp(true);
        navigation.navigate('home');
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/Background-splash.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Screen backgroundColor="transparent" variant="fixed">
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 117, height: 127, top: '40%', left: '15%' }}
            />
            <LottieView
              source={require('../../assets/animations/wifi progress.json')}
              style={{
                width: 100,
                height: 100,
                top: '18%',
                left: '25%',
                transform: [{ rotate: '22deg' }],
              }}
              resizeMode="contain"
              loop
              autoPlay
              speed={0.65}></LottieView>
            <Text
              style={{ top: '17%', left: '42%', fontSize: 40, color: 'white' }}>
              EleHome
            </Text>
            <Text
              style={{ top: '16%', left: '43%', fontSize: 18, color: 'white' }}>
              Your Smart Choice...
            </Text>
          </Screen>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});
