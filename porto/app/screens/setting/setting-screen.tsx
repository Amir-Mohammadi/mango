import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View
} from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import { Screen, Text } from '../../components';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { Space } from '../../components/space/space';
import { goBack, NavigatorParamList } from '../../navigators';
import { useReduxDispatch } from '../../redux-store/core/root-store';
import { toggleDrawer } from '../../redux-store/drawer-store';
import { useStores } from '../../stores';
import { spacing } from '../../theme';
import { Storage } from '../../utils/storage';
import { styles } from './setting-screen.style';

export const SettingScreen: React.FC<
  // StackScreenProps<SettingNavigatorParamList, 'setting'>
  StackScreenProps<NavigatorParamList, 'setting'>
> = observer(props => {
  const { userStore, dialogStore } = useStores();
  const [notificationState, setNotificationState] = useState(true);
  const changeNotificationState = () => {
    if (notificationState == true) setNotificationState(false);
    if (notificationState == false) setNotificationState(true);
  };

  const dispatch = useReduxDispatch();

  const [lockAuto, setLockAuto] = useState(false);
  const changeLockAutoState = () => {
    if (lockAuto == true) setLockAuto(false);
    if (lockAuto == false) setLockAuto(true);
  };

  useEffect(() => {
    userStore.getUserProfile();
  }, []);

  const logoutHandler = () => {
    dialogStore.showQuestionDialog({
      title: 'Logout',
      message: 'Are you sure to logout?',
      onSubmit: () => {
        Storage.clear();
        RNRestart.Restart();
      },
    });
  };
  const { navigation } = props;

  return (
    <View style={styles.CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      <Screen style={styles.CONTAINER} variant="scrollView">
        <ImageBackground
          source={require('../../assets/images/Background.png')}
          resizeMode="cover"
          style={styles.IMAGE_BACKGROUND}>
          <SafeAreaView style={{ flex: 1 }}>
            <HeaderBackLogoMenu
              onLogoPress={() => navigation.navigate('home')}
              onBackPress={() => goBack()}
              onMenuPress={() => dispatch(toggleDrawer())}
            />
            <Card containerStyle={styles.CARD_CONTAINER}>
              <View>
                <ScrollView style={styles.SCROLL_VIEW} scrollEnabled={true}>
                  <View style={styles.CARDS_CONTAINER}>
                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.CARD_TOUCHABILITY}
                        // onPress={() => changeNotificationState()}
                      >
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/notification.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'اعلانات '}
                          </Text>
                        </View>
                        <View>
                          <ToggleSwitch
                            isOn={notificationState}
                            onColor="#C4D4E4"
                            offColor="#5DB1FD"
                            size="small"
                            animationSpeed={100}
                            onToggle={() => changeNotificationState()}
                            disabled
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />
                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        // onPress={() => changeLockAutoState()}
                        style={styles.CARD_TOUCHABILITY}>
                        {/* <View style={styles.CARD_CONTENT}> */}
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/auto-lock.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'قفل خودکار اپلیکیشن'}
                          </Text>
                        </View>
                        <View>
                          <View
                          // style={{ marginRight: spacing[8] + spacing[6] }}
                          >
                            <ToggleSwitch
                              isOn={lockAuto}
                              onColor="#C4D4E4"
                              offColor="#5DB1FD"
                              size="small"
                              animationSpeed={100}
                              onToggle={() => changeLockAutoState()}
                              disabled
                            />
                          </View>
                        </View>
                        {/* </View> */}
                      </TouchableOpacity>
                    </View>
                    <Space />
                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          padding: spacing[2],
                        }}
                        onPress={() => navigation.navigate('comingSoon')}>
                        <View style={styles.CARD_CONTENT}>
                          <View
                            style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                            <Image
                              style={styles.SMALL_CARD_IMAGE}
                              source={require('../../assets/images/fingerprint.png')}
                            />
                            <Text style={styles.SMALL_CARD_TEXT}>
                              {'ورود با اثر انگشت'}
                            </Text>
                          </View>
                          <View>
                            <Image
                              style={styles.SMALL_CARD_IMAGE}
                              source={require('../../assets/images/chevron-right.png')}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />

                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.CARD_TOUCHABILITY}
                        onPress={() => navigation.navigate('comingSoon')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/language.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>{'زبان'} </Text>
                        </View>
                        <View style={styles.LANGUAGE_CONTAINER}>
                          <Text style={styles.LANGUAGE}> فارسی</Text>
                          <Image
                            style={styles.NAVIGATE_BUTTON}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />

                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.CARD_TOUCHABILITY}
                        onPress={() => navigation.navigate('about')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/about.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'درباره الویا'}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.NAVIGATE_BUTTON}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />

                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.CARD_TOUCHABILITY}
                        onPress={() => navigation.navigate('termsOfService')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/terms.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'شرایط و مقررات'}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.NAVIGATE_BUTTON}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />

                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.CARD_TOUCHABILITY}
                        onPress={() => navigation.navigate('comingSoon')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/privacy-settings.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'تنظیمات امنیتی'}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.NAVIGATE_BUTTON}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />

                    <View style={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.CARD_TOUCHABILITY}
                        onPress={() => navigation.navigate('comingSoon')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT_CONTAINER}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/fingerprint.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            ورود با اثر انگشت
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.NAVIGATE_BUTTON}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Space />
                  </View>
                </ScrollView>
                <Button
                  ViewComponent={LinearGradient}
                  buttonStyle={styles.BUTTON}
                  onPress={logoutHandler}
                  containerStyle={styles.BUTTON_CONTAINER}
                  linearGradientProps={{
                    colors: ['#5EBCFD', '#567CF8'],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0 },
                  }}
                  title="خروج از حساب کاربری"
                  titleStyle={styles.BUTTON_TITLE}
                />
              </View>
            </Card>
          </SafeAreaView>
        </ImageBackground>
      </Screen>
    </View>
  );
});
