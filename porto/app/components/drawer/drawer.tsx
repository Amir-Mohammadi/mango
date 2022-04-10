import moment from 'jalali-moment';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import {
    Dimensions,
    ImageStyle,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Text } from '../../components';
import { GradientButton } from '../../components/gradient-button/gradient-button';
import { Space } from '../../components/space/space';
import { DrawerIcon } from '../../constants/drawer-icon';
import { navigate } from '../../navigators';
import {
    useReduxDispatch,
    useReduxSelector
} from '../../redux-store/core/root-store';
import { setDrawer } from '../../redux-store/drawer-store';
import { API_URL } from '../../services/api/api-config';
import { useStores } from '../../stores';

export const DrawerModal: React.FC = props => {
  const visible = useReduxSelector(state => state.drawerStore.visible);
  const dispatch = useReduxDispatch();
  const month = moment().locale('fa').format('MMMM');
  const day = moment().locale('fa').format('D');
  const year = moment().locale('fa').format('YYYY');
  var hours = new Date().getHours(); //Current Hours

  const { userStore, authStore } = useStores();

  const checkDayTime = (Time: number) => {
    if (Time >= 5 && Time < 12) return 'صبح بخیر';
    else if (Time >= 12 && Time < 16) return 'ظهر بخیر';
    else if (Time >= 16 && Time < 20) return 'عصر بخیر';
    else return 'شب بخیر';
  };

  useEffect(() => {
    if (authStore.isLoggedIn) {
      userStore.getUserProfile();
    }
  }, [authStore.isLoggedIn]);

  return (
    <Modal
      statusBarTranslucent
      animationIn={'fadeInRight'}
      animationOut={'fadeOutRight'}
      deviceHeight={Dimensions.get('screen').height}
      style={{ flex: 1, margin: 0 }}
      presentationStyle="overFullScreen"
      isVisible={visible}
      coverScreen
      onBackdropPress={() => {
        dispatch(setDrawer(false));
      }}>
      <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '16%',
            backgroundColor: '#567CF8',
          }}>
          <DrawerIcon
            onPress={() => {
              dispatch(setDrawer(false));
            }}
            height={115}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}></View>
        </View>
        <View
          style={{
            marginTop: 115,
            marginBottom: 50,
            position: 'absolute',
            left: '16%',
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 80,
            borderBottomLeftRadius: 80,
            padding: 10,
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 13,
                }}>
                {day}
                {month}
                {year}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 17,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  color: '#599AFA',
                }}>
                {checkDayTime(hours)}
              </Text>
            </View>
            <Space />
            <View style={{ flexDirection: 'row' }}>
              <Avatar
                // onPress={handlePresentModalPress}
                containerStyle={AVATAR_COMPONENT_CONTAINER}
                rounded
                size={130}
                imageProps={{
                  containerStyle: AVATAR_COMPONENT_IMAGE_CONTAINER,
                  style: AVATAR_COMPONENT_IMAGE,
                  resizeMode: 'cover',
                }}
                source={{ uri: API_URL + userStore.profileImage }}></Avatar>
              <Space horizontal />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {userStore.firstName} {userStore.lastName}
                </Text>
                <Text>{userStore.phone}</Text>
              </View>
            </View>
            <View>
              <Space />
              <Space />

              {/* <Image
                style={{
                  height: 250,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/empty-notification.png')}
              /> */}
              <Space />
              <Space size={20} />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 190,
                }}>
                <Text text="هیچ اعلان جدیدی ندارید" />
                <Text
                  variant="secondary"
                  text="جهت مشاهده تاریخچه روی گزینه همه کلیک کنید"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <GradientButton
              onPress={() => {
                navigate('comingSoon');
                dispatch(setDrawer(false));
              }}
              title="همه اعلانات"
            />
            <Space size={30} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 100,
            width: 230,
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            transform: [
              { rotate: '-90deg' },
              { translateX: 90 },
              { translateY: 90 },
            ],
          }}>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              navigate('userProfile');
              dispatch(setDrawer(false));
            }}>
            <Image
              source={require('../../assets/images/drawer-profile.png')}
              style={{ width: 15, height: 15 }}
            />
            <Text text="پروفایل" numberOfLines={1} style={TEXT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              navigate('home');
              dispatch(setDrawer(false));
            }}>
            <Image
              source={require('../../assets/images/home.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text text="خانه" numberOfLines={1} style={TEXT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              navigate('setting');
              dispatch(setDrawer(false));
            }}>
            <Image
              source={require('../../assets/images/drawer-setting.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text text="تنظیمات" numberOfLines={1} style={TEXT} />
          </TouchableOpacity>
        </View>
      </View>
      <LottieView
        source={require('../../assets/animations/empty-notification.json')}
        style={{
          width: 243,
          height: 224,
          top: '28%',
          left: '7%',
          position: 'absolute',
        }}
        resizeMode="contain"
        loop
        autoPlay
        speed={0.65}
      />
      {/* <LottieView
        source={require('../../assets/animations/wifi progress.json')}
        style={{
          width: 100,
          height: 100,
          top: '0%',
          left: '0%',
          position: 'absolute',
          transform: [{ rotate: '22deg' }],
          backgroundColor: 'red',
        }}
        resizeMode="contain"
        loop
        autoPlay
        speed={0.65}
      /> */}
    </Modal>
  );
};

const TEXT: TextStyle = {
  fontSize: 10,
  color: 'white',
  marginBottom: 2,
};

const AVATAR_COMPONENT_CONTAINER: ViewStyle = {
  height: 65,
  width: 65,
  borderRadius: 32.5,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',

  shadowColor: 'black',
  elevation: 2,
};

const AVATAR_COMPONENT_IMAGE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  width: 60,
  borderRadius: 30,
  flex: 0,
};
const AVATAR_COMPONENT_IMAGE: ImageStyle = {
  height: 60,
  width: 60,
};
