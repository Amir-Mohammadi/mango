import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
    useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import moment from 'jalali-moment';
import { observer } from 'mobx-react-lite';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    View
} from 'react-native';
import { Avatar, Divider, Input } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components';
import { GradientButton } from '../../components/gradient-button/gradient-button';
import { Header } from '../../components/header2/header';
import { Space } from '../../components/space/space';
import { NavigatorParamList } from '../../navigators';
import { useReduxDispatch } from '../../redux-store/core/root-store';
import { toggleDrawer } from '../../redux-store/drawer-store';
import { API_URL } from '../../services/api/api-config';
import { DeviceType, useStores } from '../../stores';
import { Asset } from '../../stores/asset/asset-model';
import { spacing } from '../../theme';
import { Tabs } from './components/tabs';
import { ZoneDeviceCount } from './components/zone-device-count/zone-device-count';
import { styles } from './home-screen.style';

export const HomeScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'home'>
> = observer(props => {
  const { navigation } = props;
  const { assetStore, deviceStore, userStore } = useStores();
  const webSocket = useRef<WebSocket>();

  const isConnected = () => {
    NetInfo.fetch().then(state => {
      console.log(state.isConnected);
      return state.isConnected;
    });
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['35%', '80%'], []);
  const [newAssetName, setNewAsset] = useState<string>('');

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
      />
    ),
    [],
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSelectHome = (asset: Asset) => {
    deviceStore.setCurrentAssetId(asset.id);
    handleCloseModalPress();
  };

  const [
    isReadyToSendSubscriptionMessage,
    setIsReadyToSendSubscriptionMessage,
  ] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      userStore.getUserProfile();
      assetStore.getAssets();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      assetStore.getAssets().then(result => {
        if (result === true) {
          const currentAssetId = assetStore.checkAndGetValidCurrentAssetId(
            deviceStore.currentAssetId,
          );
          deviceStore.setCurrentAssetId(currentAssetId);
        }
      });
      return () => {
        setIsReadyToSendSubscriptionMessage(false);
      };
    }, []),
  );

  const dispatch = useReduxDispatch();

  const month = moment().locale('fa').format('MMMM');
  const day = moment().locale('fa').format('D');
  const year = moment().locale('fa').format('YYYY');

  const sendSubscriptionMessage = () => {
    console.log(
      'subscription message is',
      deviceStore.getSubscriptionMessage(),
    );
    webSocket.current?.send(deviceStore.getSubscriptionMessage());
  };

  const onMessage = (event: any) => {
    console.log('message', event);
    deviceStore.parseSubscriptionMessage(event);
  };

  useEffect(() => {
    if (isReadyToSendSubscriptionMessage === true) {
      sendSubscriptionMessage();
      setIsReadyToSendSubscriptionMessage(false);
    }
  }, [isReadyToSendSubscriptionMessage]);

  useEffect(() => {
    if (deviceStore.currentAssetId !== '') {
      deviceStore.prepareWsUrl();
      deviceStore.getDevices().then(result => {
        if (result === true) {
          setIsReadyToSendSubscriptionMessage(true);
        }
      });
    }
  }, [deviceStore.currentAssetId]);

  const onSelectDeviceHandler = (
    deviceId: string,
    deviceType: DeviceType | null,
  ) => {
    deviceStore.setCurrentDeviceId(deviceId);
    navigation.navigate('fanSwitch');
    // switch (deviceType) {
    //   case DeviceType.fanSwitchV1:
    //     navigation.navigate('fanSwitch');
    //     break;
    //   case DeviceType.threePoleSwitchV1:
    //     navigation.navigate('threePoleSwitch');
    //     break;
    // }
  };
  
  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../../assets/images/Background.png')}
          resizeMode="cover"
          imageStyle={styles.IMAGE_BACKGROUND_IMAGE}
          style={styles.IMAGE_BACKGROUND_CONTAINER}>
          <SafeAreaView style={{ paddingHorizontal: spacing[4], flex: 1 }}>
            <Header
              style={{
                width: '100%',
                height: 77,
                marginTop: spacing[2],
              }}
              headerRightComponent={
                <TouchableOpacity
                  onPress={() => {
                    dispatch(toggleDrawer());
                  }}>
                  <Image
                    source={require('../../assets/images/menu.png')}
                    resizeMode="contain"
                    style={styles.HEADER_RIGHT}
                  />
                </TouchableOpacity>
              }
              headerMiddleComponent={
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignSelf: 'center',
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>
                      {day}
                      {month}
                      {year}
                    </Text>
                    <Image
                      source={require('../../assets/images/weather.png')}
                      style={{ width: 29, height: 27 }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={
                        // assetStore.assetList.length > 1
                        //   ? handlePresentModalPress
                        //   : undefined
                        handlePresentModalPress
                      }
                      style={{
                        borderRadius: 18,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 20,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginLeft: spacing[1],
                          fontSize: 11,
                          color: '#6184C7',
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {deviceStore.currentAsset?.label}
                      </Text>
                      {/* {assetStore.assetList.length > 1 ? ( */}
                      <Image
                        source={require('../../assets/images/expand.png')}
                        style={{
                          resizeMode: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      {/* ) : null} */}
                    </TouchableOpacity>
                  </View>
                </View>
              }
              headerLeftComponent={
                <TouchableOpacity
                  style={{ height: 65 }}
                  onPress={() => navigation.navigate('userProfile')}>
                  <Avatar
                    containerStyle={{
                      height: 65,
                      width: 65,
                      borderRadius: 32.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    imageProps={{
                      containerStyle: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 65,
                        width: 65,
                        borderRadius: 32.5,
                        flex: 0,
                      },
                      style: {
                        height: 65,
                        width: 65,
                      },
                      resizeMode: 'contain',
                    }}
                    source={
                      userStore.profileImage
                        ? {
                            uri: API_URL + userStore.profileImage,
                          }
                        : require('../../assets/personal_icon.png')
                    }
                  />
                </TouchableOpacity>
              }
            />
            <Space />
            <Space />
            <ZoneDeviceCount
              onPress={zoneName =>
                navigation.navigate('room', {
                  zone: zoneName,
                })
              }
            />
            <View
              style={{
                marginTop: spacing[5],
                height: '70%',
                backgroundColor: 'white',
                borderRadius: 8,
                elevation: 50,
              }}>
              <Image
                source={require('../../assets/images/card-bg.png')}
                resizeMode="cover"
                style={{
                  width: '100%',
                  marginHorizontal: 0,
                  paddingHorizontal: 0,
                  height: '60%',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
              />
              <Tabs />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        style={{ elevation: 17, flex: 1 }}
        backdropComponent={renderBackdrop}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enableContentPanningGesture
        enableDismissOnClose
        handleIndicatorStyle={{
          backgroundColor: '#D3D6DA',
          height: 6,
          width: 48,
        }}>
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: spacing[5],
          }}
          onLayout={handleContentLayout}>
          <SafeAreaView
            style={{
              flex: 1,
              alignSelf: 'center',
              width: '100%',
            }}
            edges={['bottom']}>
            <FlatList
              style={{ maxHeight: 120 }}
              keyExtractor={item => item.id}
              data={assetStore.assetList.filter(
                asset => asset.id !== deviceStore.currentAssetId,
              )}
              renderItem={asset => {
                return (
                  <View
                    key={asset.item.id}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleSelectHome(asset.item)}>
                      <Text style={{ textAlign: 'center' }}>
                        {asset.item.label}
                      </Text>
                    </TouchableOpacity>
                    <Space />
                    <Divider />
                  </View>
                );
              }}
            />
            <Input
              style={{
                fontSize: 20,
                flex: 1,
                textAlign: 'right',
                justifyContent: 'center',
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: '#5992FA',
                borderRadius: 8,
              }}
              inputStyle={{ marginTop: 0, paddingTop: 1 }}
              placeholder="خانه جدید"
              onChangeText={value => {
                setNewAsset(value);
              }}
            />
            <GradientButton
              onPress={async () => {
                const res = await assetStore.addAsset('Home', newAssetName);
                if (res.kind == 'ok') {
                  assetStore.getAssets();
                  deviceStore.setCurrentAssetId(res.data.id);
                }
              }}
              text={'افزودن'}
            />
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});
