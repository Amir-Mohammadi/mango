import { useFocusEffect } from '@react-navigation/native';
import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    View
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import { Screen, Text } from '../../components';
import { Header } from '../../components/header2/header';
import { goBack, SettingNavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { namedSpacing, spacing } from '../../theme';
import { Storage } from '../../utils/storage';
export const SettingScreen: React.FC<
  StackScreenProps<SettingNavigatorParamList, 'setting'>
> = observer(props => {
  const { userStore, dialogStore } = useStores();
  const [notificationState, setNotificationState] = useState(true);
  const changeNotificationState = () => {
    if (notificationState == true) setNotificationState(false);
    if (notificationState == false) setNotificationState(true);
  };

  const [lockAuto, setLockAuto] = useState(true);
  const changeLockAutoState = () => {
    if (lockAuto == true) setLockAuto(false);
    if (lockAuto == false) setLockAuto(true);
  };

  useFocusEffect(
    useCallback(() => {
      userStore.getUserProfile();
    }, []),
  );

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

  return (
    <View style={CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaProvider>
        <Screen style={CONTAINER} variant="scrollView">
          <ImageBackground
            source={require('../../assets/images/Background.png')}
            resizeMode="cover"
            style={IMAGE_BACKGROUND}>
            <Header
              headerLeftComponent={
                <View>
                  <Image
                    source={require('../../assets/images/white-back.png')}
                    style={{
                      marginTop: spacing[8],
                      width: 11,
                      height: 22,
                      marginLeft: spacing[2],
                    }}
                  />
                </View>
              }
              headerRightComponent={
                <View>
                  <Image
                    source={require('../../assets/images/menu.png')}
                    style={{
                      marginTop: spacing[8],
                      width: 27,
                      height: 24,
                      marginRight: spacing[2],
                    }}
                  />
                </View>
              }
            />
            <Image
              source={require('../../assets/images/Elehome.png')}
              style={{
                width: 203,
                height: 54,
                alignSelf: 'center',
                marginTop: spacing[4],
              }}
            />
            <Card containerStyle={CARD_CONTAINER}>
              <View>
                <ScrollView
                  style={{ flexGrow: 0, maxHeight: 436 }}
                  scrollEnabled={true}>
                  <View>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              marginTop: 3,

                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/notification.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 14,
                              fontFamily: 'IRANSans',
                            }}>
                            اعلانات{' '}
                          </Text>
                        </View>
                        <View style={{ height: 18.31, width: 21.13 }}>
                          <ToggleSwitch
                            isOn={notificationState}
                            onColor="#48d1cc"
                            offColor="#5DB1FD"
                            size="small"
                            onToggle={() => changeNotificationState()}
                          />
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              marginTop: 3,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/auto-lock.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            قفل خودکار اپلیکیشن{' '}
                          </Text>
                        </View>
                        <View>
                          <View style={{ height: 18.31, width: 21.13 }}>
                            <ToggleSwitch
                              isOn={lockAuto}
                              onColor="#48d1cc"
                              offColor="#5DB1FD"
                              size="small"
                              onToggle={() => changeLockAutoState()}
                            />
                          </View>
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }}
                            source={require('../../assets/images/fingerprint.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            ورود با اثر انگشت
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }}
                            source={require('../../assets/images/language.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            زبان{' '}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#969696',
                              marginLeft: spacing[2],
                            }}>
                            {' '}
                            فارسی
                          </Text>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }}
                            source={require('../../assets/images/about.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            درباره الویا{' '}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }}
                            source={require('../../assets/images/terms.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            شرایط و مقررات{' '}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }}
                            source={require('../../assets/images/privacy-settings.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            تنظیمات امنیتی{' '}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </View>
                    </Card>
                    <Card containerStyle={SMALL_CARD}>
                      <View
                        style={{
                          marginTop: spacing[2],
                          flexDirection: 'row-reverse',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }}
                            source={require('../../assets/images/fingerprint.png')}
                          />
                          <Text
                            style={{
                              justifyContent: 'center',
                              marginRight: spacing[2],
                              fontSize: 13,
                              fontFamily: 'IRANSans',
                            }}>
                            ورود با اثر انگشت
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={{
                              height: 18.31,
                              width: 21.13,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </View>
                    </Card>
                  </View>
                </ScrollView>
                <Button
                  ViewComponent={LinearGradient}
                  buttonStyle={{ borderRadius: 8 }}
                  onPress={logoutHandler}
                  linearGradientProps={{
                    colors: ['#5EBCFD', '#567CF8'],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0 },
                  }}
                  title="خروج از حساب کاربری"
                  titleStyle={{
                    fontSize: 20,
                    fontFamily: 'IRANSans',
                  }}
                />
              </View>
            </Card>
          </ImageBackground>
        </Screen>
      </SafeAreaProvider>
    </View>
  );
});

export const SettingScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'User Profile',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        name="arrowleft"
        type="ant-design"
        onPress={() => {
          goBack();
        }}
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};

const CONTAINER = { flex: 1 };
const IMAGE_BACKGROUND = { flex: 1, height: '35%' };
const CARD_CONTAINER = {
  marginTop: spacing[6] + spacing[5],
  marginHorizontal: spacing[5],
  elevation: 10,
  borderRadius: 10,
};
const SMALL_CARD = {
  elevation: 30,
  shadowColor: '#00000040',
  borderWidth: 0,
  backgroundColor: 'white',
  borderRadius: 5,
  height: 49,
};
const SMALL_CARD_IMAGE = {
  height: 18.31,
  width: 21.13,
  resizeMode: 'contain',
};
const SMALL_CARD_TEXT = {
  justifyContent: 'center',
  marginRight: spacing[2],
  fontSize: 14,
  fontFamily: 'IRANSans',
};
