import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurBackground } from '../../components/blur-background/blur-background';
import { GradientButton } from '../../components/gradient-button/gradient-button';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { Space } from '../../components/space/space';
import { Text } from '../../components/text/text';
import { ValidationType } from '../../components/validation-input/validation-input';
import { goBack, navigate, NavigatorParamList } from '../../navigators';
import { Device, useStores } from '../../stores';
import { namedSpacing, spacing } from '../../theme';
import { SmallCard } from './components/small-card';
export const DeviceSettingScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'deviceSetting'>
> = observer(props => {
  const { dialogStore, deviceStore } = useStores();

  const onEditDeviceNameModalShow = () => {
    dialogStore.showInputDialog({
      title: 'Device Name',
      validationType: [ValidationType.required],
      inputInitialValue: deviceStore.device?.label,
      inputPlaceHolder: 'Device Name',
      onSubmit: deviceName => editDeviceName(deviceName),
    });
  };

  const mapOfDevice = new Map<string, Device[]>();
  const getZonesDevices = (list: Device[]): Map<string, Device[]> => {
    const result = new Map<string, Device[]>();

    list.forEach(device => {
      var itemZone = device.zone;

      var exist = result.get(itemZone);
      if (exist === undefined) {
        if (itemZone !== '' || itemZone !== undefined || itemZone !== null)
          result.set(itemZone, [device]);
      } else {
        exist.push(device);
      }
    });

    return result;
  };

  const zonesDevices = getZonesDevices(deviceStore.deviceList);
  const zones = Array.from(zonesDevices.keys());

  const editDeviceName = (deviceName: string) => {
    deviceStore.editDeviceName(deviceName).then(result => {
      if (result === true) {
        deviceStore.getDevice();
      }
    });
  };

  const handleSubmit = async () => {
    // check zone input
    if (zoneInput) {
      await editDeviceZone(zoneInput);
      setChangeRoomModal(false);
      return;
    }
    // check zone selected

    if (selectedZone) {
      await editDeviceZone(zoneInput);
      setChangeRoomModal(false);
      return;
    }
  };

  const editDeviceZone = async (zone: string) => {
    const result = await deviceStore.setNewZone(zone);
    if (result === true) {
      deviceStore.setNewZone(zone);
    }
  };
  const [changeDeviceNameModal, setChangeDeviceNameModal] = useState(false);
  const [changeRoomModal, setChangeRoomModal] = useState(false);
  const [zoneInput, setZoneInput] = useState('');
  const [name, setName] = useState<string>('');
  const [selectedZone, changeSelectedZone] = useState<string | null>(null);

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/Background-full.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBackLogoMenu onBackPress={goBack} />
          <ScrollView
            style={{
              marginHorizontal: spacing[4],
              marginTop: spacing[5],
              marginBottom: spacing[8],
              height: '80%',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingHorizontal: spacing[4],
              paddingTop: spacing[6],
            }}>
            <SmallCard
              text="تغییر عنوان دستگاه"
              onPress={() => setChangeDeviceNameModal(true)}
            />
            <SmallCard
              text="تغییر اتاق دستگاه"
              onPress={() => {
                setChangeRoomModal(true);
                setZoneInput('');
                deviceStore.device?.zone
                  ? changeSelectedZone(deviceStore.device?.zone)
                  : null;
              }}
            />
            <SmallCard
              text=" اشتراک گذاری"
              onPress={() => navigate('comingSoon')}
            />
            <SmallCard
              text="سوالات متداول"
              onPress={() => navigate('comingSoon')}
            />
            <SmallCard
              text="بروزرسانی سخت افزار"
              onPress={() => navigate('comingSoon')}
            />
            <SmallCard
              text="بررسی وضعیت شبکه دستگاه"
              onPress={() => navigate('comingSoon')}
            />
          </ScrollView>

          <Modal statusBarTranslucent visible={changeDeviceNameModal}>
            <BlurBackground />
            <KeyboardAvoidingView
              behavior="height"
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <Pressable
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onPress={() => {
                  setChangeDeviceNameModal(false);
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  height: 225,
                  borderRadius: 10,
                  marginHorizontal: spacing[4],
                  elevation: 20,
                  paddingHorizontal: spacing[6],
                }}>
                <Space />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  تغییر عنوان دستگاه
                </Text>
                <Space size={15} />
                <Input
                  defaultValue={deviceStore.device?.label}
                  placeholder={deviceStore.device?.label}
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#5992FA',
                    fontSize: 20,
                    justifyContent: 'center',
                    textAlign: 'right',
                    paddingRight: spacing[2],
                  }}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    alignSelf: 'center',
                  }}
                  onChangeText={value => {
                    setName(value);
                  }}
                />
                <GradientButton
                  text="ذخیره"
                  style={{ alignSelf: 'center' }}
                  onPress={() => {
                    editDeviceName(name);
                    setChangeDeviceNameModal(false);
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </Modal>

          <Modal statusBarTranslucent visible={changeRoomModal}>
            <BlurBackground />
            <KeyboardAvoidingView
              behavior="height"
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <Pressable
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onPress={() => {
                  setChangeRoomModal(false);
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  height: 225,
                  borderRadius: 10,
                  marginHorizontal: spacing[4],
                  marginBottom: spacing[3],
                  elevation: 20,
                  paddingHorizontal: spacing[6],
                }}>
                <Space />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  تغییر اتاق دستگاه
                </Text>
                <Space size={15} />

                <ScrollView>
                  {zones
                    .filter(x => x)
                    .map((item, index) => (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row-reverse',
                          borderRadius: 12,
                          paddingVertical: spacing[3],
                          backgroundColor:
                            item === selectedZone && zoneInput === ''
                              ? '#E5F1FF'
                              : 'white',
                        }}
                        onPress={() => {
                          setZoneInput('');
                          changeSelectedZone(item);
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                            textAlign: 'center',
                            flex: 1,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  <Input
                    placeholder="اتاق جدید"
                    inputContainerStyle={{
                      borderBottomWidth: 1,
                      borderColor: '#5DB3FD',
                    }}
                    onChangeText={value => {
                      setZoneInput(value);
                    }}
                    value={zoneInput}
                    onSubmitEditing={() => editDeviceZone(zoneInput)}
                    inputStyle={{ textAlign: 'center' }}
                  />
                </ScrollView>

                <GradientButton
                  text="ذخیره"
                  style={{ alignSelf: 'center' }}
                  onPress={handleSubmit}
                  loading={deviceStore.isLoading}
                />
                <Space />
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});

export const DeviceSettingScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Device Setting',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        onPress={() => {
          goBack();
        }}
        name="arrowleft"
        type="ant-design"
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};
