import { useFocusEffect } from '@react-navigation/native';
import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback, useState } from 'react';
import {
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    View
} from 'react-native';
import { Avatar, Card, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Text } from '../../components';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { goBack, NavigatorParamList } from '../../navigators';
import { useReduxDispatch } from '../../redux-store/core/root-store';
import { toggleDrawer } from '../../redux-store/drawer-store';
import { useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { styles } from './user-profile-screen.style';

export const UserProfileScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'userProfile'>
> = observer(props => {
  const { userStore } = useStores();
  const { navigation } = props;
  
  useFocusEffect(
    useCallback(() => {
      userStore.getUserProfile();
    }, []),
  );

  const [visible, setVisible] = useState(true);
  const dispatch = useReduxDispatch();

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.CONTAINER}>
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

              <View>
                <Card containerStyle={styles.CARD_CONTAINER}>
                  <Card.Title style={styles.CARD_TITLE_NAME}>
                    {userStore.firstName} {' ' + userStore.lastName}
                  </Card.Title>
                  <Card.Title style={styles.CARD_TITLE_NUMBER}>
                    {userStore.phone}
                  </Card.Title>
                  <View>
                    <Card containerStyle={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.SMALL_CARD_CONTENT}
                        onPress={() => navigation.navigate('editUserProfile')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/personal_icon.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            ویرایش پروفایل
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.SMALL_CARD_ARROW}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </Card>

                    <Card containerStyle={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.SMALL_CARD_CONTENT}
                        onPress={() => navigation.navigate('comingSoon')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/Notifications.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'اعلانات '}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.SMALL_CARD_ARROW}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card containerStyle={styles.SMALL_CARD}>
                      <TouchableOpacity
                        style={styles.SMALL_CARD_CONTENT}
                        onPress={() => navigation.navigate('setting')}>
                        <View style={styles.SMALL_CARD_RIGHT_CONTENT}>
                          <Image
                            style={styles.SMALL_CARD_IMAGE}
                            source={require('../../assets/images/Settings.png')}
                          />
                          <Text style={styles.SMALL_CARD_TEXT}>
                            {'تنظیمات عمومی '}
                          </Text>
                        </View>
                        <View>
                          <Image
                            style={styles.SMALL_CARD_ARROW}
                            source={require('../../assets/images/chevron-right.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </View>
                  <LinearGradient
                    colors={['#567DF8', '#5EBCFD']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.QR_CODE_BORDER}>
                    <Image
                      source={require('../../assets/images/qr-code.png')}
                      style={styles.QR_CODE}
                    />
                  </LinearGradient>
                  <Text style={styles.VERSION}>نسخه نرم افزار: 2.045 </Text>
                </Card>

                <LinearGradient
                  colors={['#567DF8', '#5EBCFD']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.AVATAR_BORDER}>
                  <Avatar
                    rounded
                    size={130}
                    containerStyle={styles.AVATAR_CONTAINER}
                    source={
                      userStore.profileImage
                        ? {
                            uri: userStore.profileImage,
                          }
                        : require('../../assets/personal_icon.png')
                    }
                  />
                </LinearGradient>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </Screen>
      </View>
    </Fragment>
  );
});

export const UserProfileScreenOptions = (): StackNavigationOptions => {
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
