import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { Space } from '../../components/space/space';
import { goBack, NavigatorParamList } from '../../navigators';
import { useReduxDispatch } from '../../redux-store/core/root-store';
import { toggleDrawer } from '../../redux-store/drawer-store';
import { spacing } from '../../theme';

export const ComingSoonScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'comingSoon'>
> = observer(props => {
  const { navigation } = props;
  const dispatch = useReduxDispatch();

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/Background-full.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBackLogoMenu
            onBackPress={goBack}
            onLogoPress={() => navigation.navigate('home')}
            onMenuPress={() => {
              dispatch(toggleDrawer());
            }}
          />
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
              }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {'در نسخه بعدی...'}
              </Text>
              <Space />
              <Divider
                style={{ width: '40%', alignSelf: 'center' }}
                width={2}
                color={'#5A97FB'}
              />
              <LottieView
                source={require('../../assets/animations/coming-soon.json')}
                autoPlay
                loop
              />
              <Text
                style={{
                  fontSize: 26,
                  color: '#808080',
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: '17%',
                  alignSelf: 'center',
                }}>
                Coming Soon
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#808080',
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: '10%',
                  alignSelf: 'center',
                }}>
                {'یکم بعد به این صفحه برگردید...'}
              </Text>
              <Space />
              <Space />
              <Space />
            </View>
          </Screen>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});
