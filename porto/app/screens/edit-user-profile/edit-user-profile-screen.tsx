import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StatusBar,
    TouchableOpacity,
    View
} from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Asset } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Text } from '../../components';
import { BlurBackground } from '../../components/blur-background/blur-background';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { Space } from '../../components/space/space';
import { goBack, navigate, NavigatorParamList } from '../../navigators';
import { useReduxDispatch } from '../../redux-store/core/root-store';
import { toggleDrawer } from '../../redux-store/drawer-store';
import { API_URL } from '../../services/api/api-config';
import { useStores } from '../../stores';
import { ChangePhoneNumber } from './components/change-phone-number';
import { ChangeProfilePicture } from './components/change-profile-picture';
import { EmailInput } from './components/email-input';
import { LogOut } from './components/logout';
import { NameInput } from './components/name-input';
import { styles } from './edit-user-profile-screen.style';

export const EditUserProfileScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'editUserProfile'>
> = observer(props => {
  const { userStore } = useStores();
  const { navigation } = props;

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [profilePictureModalVisible, setProfilePictureModalVisible] =
    useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { authStore } = useStores();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    userStore.getUserProfile();
  }, []);
  const [background1, changeBackground1] = useState<
    'white' | 'rgba(96,193,255,.075)'
  >('white');
  const [background2, changeBackground2] = useState<
    'white' | 'rgba(96,193,255,.075)'
  >('white');
  const [background3, changeBackground3] = useState<
    'white' | 'rgba(96,193,255,.075)'
  >('white');

  const handleAddImage = async (image: Asset) => {
    if (!image.uri) return;
    if (userStore.isLoading) return;

    const myPicture = new FormData();
    myPicture.append('files', {
      name: image.fileName,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
    userStore.editProfileImage(myPicture);
  };

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

            <View>
              <Card containerStyle={styles.CARD_CONTAINER}>
                <TouchableOpacity
                  style={styles.CARD_TITLE_NAME_CONTAINER}
                  onPress={() => setNameModalVisible(true)}>
                  <View style={styles.CARD_TITLE_NAME_SCROLL}>
                    <Card.Title
                      numberOfLines={1}
                      ellipsizeMode="middle"
                      style={styles.CARD_TITLE_NAME}>
                      {userStore.firstName + ' ' + userStore.lastName}
                    </Card.Title>
                  </View>
                  <View style={styles.EDIT_BUTTON_CONTAINER}>
                    <Image
                      style={styles.EDIT_BUTTON}
                      source={require('../../assets/images/edit.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.CARD_TITLE_NAME_CONTAINER}
                  onPress={() => setPhoneModalVisible(true)}>
                  <View style={styles.CARD_TITLE_NUMBER_CONTAINER}>
                    <Card.Title
                      numberOfLines={1}
                      ellipsizeMode="middle"
                      style={styles.CARD_TITLE_NUMBER}>
                      {userStore.phone}
                    </Card.Title>
                  </View>
                  <View style={styles.EDIT_BUTTON_CONTAINER}>
                    <Image
                      style={styles.EDIT_BUTTON}
                      source={require('../../assets/images/edit.png')}
                    />
                  </View>
                </TouchableOpacity>

                <View>
                  <Card
                    containerStyle={[
                      styles.SMALL_CARD,
                      { backgroundColor: background1 },
                    ]}>
                    <Pressable
                      onPressIn={() =>
                        changeBackground1('rgba(96,193,255,.075)')
                      }
                      onPressOut={() => changeBackground1('white')}
                      style={styles.SMALL_CARD_CONTENT}
                      onPress={() => setEmailModalVisible(true)}>
                      <View style={styles.SMALL_CARD_RIGHT_CONTENT}>
                        <Image
                          style={styles.SMALL_CARD_IMAGE}
                          source={require('../../assets/images/email.png')}
                        />
                        <Text style={styles.SMALL_CARD_TEXT}>
                          {'آدرس ایمیل'}
                        </Text>
                      </View>
                      <View>
                        <Image
                          style={styles.SMALL_CARD_ARROW}
                          source={require('../../assets/images/chevron-right.png')}
                        />
                      </View>
                    </Pressable>
                  </Card>

                  <Card
                    containerStyle={[
                      styles.SMALL_CARD,
                      { backgroundColor: background2 },
                    ]}>
                    <Pressable
                      style={styles.SMALL_CARD_CONTENT}
                      onPressIn={() =>
                        changeBackground2('rgba(96,193,255,.075)')
                      }
                      onPressOut={() => changeBackground2('white')}
                      onPress={() => navigation.navigate('comingSoon')}>
                      <View style={styles.SMALL_CARD_RIGHT_CONTENT}>
                        <Image
                          style={styles.SMALL_CARD_IMAGE}
                          source={require('../../assets/images/time-zone.png')}
                        />
                        <Text style={styles.SMALL_CARD_TEXT}>
                          {'منطقه زمانی '}
                        </Text>
                      </View>
                      <View>
                        <Image
                          style={styles.SMALL_CARD_ARROW}
                          source={require('../../assets/images/chevron-right.png')}
                        />
                      </View>
                    </Pressable>
                  </Card>

                  <Card
                    containerStyle={[
                      styles.SMALL_CARD,
                      { backgroundColor: background3 },
                    ]}>
                    <Pressable
                      onPress={() => navigate('comingSoon')}
                      onPressIn={() =>
                        changeBackground3('rgba(96,193,255,.075)')
                      }
                      onPressOut={() => changeBackground3('white')}
                      style={styles.SMALL_CARD_CONTENT}>
                      <View style={styles.SMALL_CARD_RIGHT_CONTENT}>
                        <Image
                          style={styles.SMALL_CARD_IMAGE}
                          source={require('../../assets/images/delete-account.png')}
                        />
                        <Text style={styles.SMALL_CARD_TEXT}>
                          {'حذف حساب کاربری'}
                        </Text>
                      </View>
                      <View>
                        <Image
                          style={styles.SMALL_CARD_ARROW}
                          source={require('../../assets/images/chevron-right.png')}
                        />
                      </View>
                    </Pressable>
                  </Card>
                </View>
                <Space />
                <Space />
                <Space />
                <Space />
                <Space />
                <Pressable>
                  <Button
                    onPress={() => setLogoutModalVisible(true)}
                    title="خروج از حساب کاربری"
                    titleStyle={styles.LOG_OUT_TITLE}
                    containerStyle={styles.LOG_OUT_CONTAINER}
                  />
                </Pressable>
              </Card>
            </View>

            <Modal statusBarTranslucent visible={profilePictureModalVisible}>
              <BlurBackground />
              <KeyboardAvoidingView
                behavior="height"
                style={styles.MODAL_CONTAINER}>
                <Pressable
                  style={styles.BLUR_PART}
                  onPress={() => {
                    setProfilePictureModalVisible(false);
                  }}
                />

                <ChangeProfilePicture
                  errorMessage={''}
                  onClickAddImage={handleAddImage}
                />
              </KeyboardAvoidingView>
            </Modal>
            <Modal statusBarTranslucent visible={emailModalVisible}>
              <BlurBackground />
              <KeyboardAvoidingView
                behavior="height"
                style={styles.MODAL_CONTAINER}>
                <Pressable
                  style={styles.BLUR_PART}
                  onPress={() => {
                    setEmailModalVisible(false);
                  }}
                />

                <EmailInput
                  inputChangeHandler={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  onConfirm={email => {
                    setEmailModalVisible(false);
                    authStore.register(userStore.firstName, userStore.lastName);
                  }}
                  errorMessage={''}
                />
              </KeyboardAvoidingView>
            </Modal>
            <Modal statusBarTranslucent visible={phoneModalVisible}>
              <BlurBackground />
              <KeyboardAvoidingView
                behavior="height"
                style={styles.MODAL_CONTAINER}>
                <Pressable
                  style={styles.BLUR_PART}
                  onPress={() => {
                    setPhoneModalVisible(false);
                  }}
                />
                <ChangePhoneNumber
                  onFinish={() => {
                    setPhoneModalVisible(false);
                  }}
                />
              </KeyboardAvoidingView>
            </Modal>
            <Modal statusBarTranslucent visible={nameModalVisible}>
              <BlurBackground />
              <KeyboardAvoidingView
                behavior="height"
                style={styles.MODAL_CONTAINER}>
                <Pressable
                  style={styles.BLUR_PART}
                  onPress={() => {
                    setNameModalVisible(false);
                  }}
                />

                <NameInput
                  inputChangeHandler={() => {}}
                  onConfirm={(firstName, lastName) => {
                    setNameModalVisible(false);
                    // userStore.editFullNameUserProfile(firstName, lastName);
                  }}
                  errorMessage={''}
                />
              </KeyboardAvoidingView>
              <Space />
              <Space />
            </Modal>

            <Modal statusBarTranslucent visible={logoutModalVisible}>
              <BlurBackground />
              <KeyboardAvoidingView
                behavior="height"
                style={styles.MODAL_CONTAINER}>
                <Pressable
                  style={styles.BLUR_PART}
                  onPress={() => {
                    setLogoutModalVisible(false);
                  }}
                />
                <LogOut
                  onConfirm={() => {
                    setLogoutModalVisible(false);
                  }}
                />
              </KeyboardAvoidingView>
            </Modal>
            <LinearGradient
              colors={['#567DF8', '#5EBCFD']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.AVATAR_BORDER}>
              <Avatar
                onPress={() => setProfilePictureModalVisible(true)}
                rounded
                size={130}
                containerStyle={styles.AVATAR_CONTAINER}
                avatarStyle={{
                  resizeMode: 'contain',
                  width: 125,
                  height: 125,
                }}
                source={{
                  uri: API_URL + userStore.profileImage,
                }}
              />
              <Pressable
                style={{
                  position: 'absolute',
                  bottom: 8,
                }}>
                <Image
                  source={require('../../assets/images/change-avatar.png')}
                  style={styles.AVATAR_EDIT_BUTTON}
                />
              </Pressable>
            </LinearGradient>

            <LinearGradient
              pointerEvents="none"
              colors={['#00000035', 'transparent']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0.8 }}
              locations={[1, 0]}
              style={styles.AVATAR_EDIT_BUTTON_CONTAINER}></LinearGradient>
          </SafeAreaView>
        </ImageBackground>
      </Screen>
    </View>
  );
});
