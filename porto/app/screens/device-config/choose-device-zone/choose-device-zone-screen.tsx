import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    StatusBar,
    View
} from 'react-native';
import { Divider, Image, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import { BlurBackground } from '../../../components/blur-background/blur-background';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { Screen } from '../../../components/screen/screen';
import { Space } from '../../../components/space/space';
import { Text } from '../../../components/text/text';
import { NavigatorParamList } from '../../../navigators';
import { Device, useStores } from '../../../stores';
import { spacing } from '../../../theme';
import { Zones } from './components/zone-device-count/zones';

export const chooseDeviceZoneScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'chooseDeviceZone'>
> = observer(props => {
  const [deviceNameModalVisible, changeDeviceNameVisible] = useState(false);
  const [addZoneModalVisible, changeAddZoneModalVisible] = useState(false);
  const [addToFavorite, changeAddToFavorite] = useState(false);
  const [tempTitle, changeTempTitle] = useState<string>('');
  const [title, changeTitle] = useState<string>('کلید هوشمند الویا');
  const [selectedZone, changeSelectedZone] = useState<string>('');
  const { deviceStore } = useStores();
  const suggestedZones = [
    'آشپزخانه',
    'اتاق خواب',
    'کتابخانه',
    'اتاق مطالعه',
    'حیاط',
    'بالکن',
    'اتاق',
  ];

  const getZonesDevices = useCallback(
    (list: Device[]): Map<string, Device[]> => {
      const result = new Map<string, Device[]>();

      list.forEach(device => {
        var itemZone = device.zone;

        var exist = result.get(itemZone);
        if (exist === undefined) {
          if (itemZone) {
            result.set(itemZone, [device]);
          }
        } else {
          exist.push(device);
        }
      });

      return result;
    },
    [],
  );

  const zonesDevices = getZonesDevices(deviceStore.deviceList);
  const zones = Array.from(zonesDevices.keys());
  const editDeviceZone = async (zone: string) => {
    const result = await deviceStore.setNewZone(zone);
    if (result === true) {
      deviceStore.setNewZone(zone);
    }
  };
  var validSuggestedZones = suggestedZones.filter(f => !zones.includes(f));
  const [zoneInput, setZoneInput] = useState('');
  const handleSubmit = async () => {
    // check zone input
    if (zoneInput) {
      await editDeviceZone(zoneInput);
      changeAddZoneModalVisible(false);
      return;
    }
  };

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../../assets/images/Background-full.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Screen backgroundColor="transparent" variant="fixed">
            <View
              style={{
                marginHorizontal: spacing[4],
                marginTop: spacing[5],
                marginBottom: spacing[6],
                backgroundColor: 'white',
                borderRadius: 20,
                paddingHorizontal: spacing[4],
                paddingTop: spacing[4],
                height: 657,
              }}>
              <Space />

              <Space />

              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/device.png')}
                  style={{
                    width: 116,
                    height: 116,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
                <Space />
                <Space />
                <Space />
                <TouchableOpacity
                  style={{ flexDirection: 'row-reverse' }}
                  onPress={() => changeDeviceNameVisible(true)}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {title}
                  </Text>

                  <Image
                    source={require('../../../assets/images/edit2.png')}
                    style={{ width: 20, height: 20, marginRight: spacing[3] }}
                  />
                </TouchableOpacity>
              </View>
              <Space />
              <Space />
              <Space />
              <Space />
              <View style={{ flexDirection: 'row', paddingHorizontal: 34 }}>
                <TouchableOpacity
                  onPress={() => changeAddZoneModalVisible(true)}>
                  <Image
                    source={require('../../../assets/images/Add.png')}
                    style={{ height: 41, width: 41 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                  }}>
                  <Zones
                    zones={zones}
                    selectedZone={selectedZone}
                    onSelect={zone => {
                      changeSelectedZone(zone);
                    }}
                  />
                </View>
              </View>
              <Space />
              <Space />

              <Space />
              <Space />
              <View
                style={{
                  overflow: 'hidden',
                  alignSelf: 'center',
                  flex: 1,
                }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  اتاق های پیشنهادی
                </Text>
                <Space />
                <Space />
                <FlatList
                  style={{}}
                  numColumns={3}
                  keyExtractor={item => item}
                  data={validSuggestedZones}
                  renderItem={({ index, item }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                            item === selectedZone ? '#5D9FFB' : '#DCECFF',
                          flexDirection: 'row-reverse',
                          borderRadius: 12,
                          height: 41,
                          width: 71,
                          paddingRight: spacing[5],
                          paddingLeft: spacing[1],
                          marginRight: spacing[5],
                          marginBottom: spacing[3],
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        onPress={() => changeSelectedZone(item)}>
                        <View
                          style={{
                            justifyContent: 'center',
                            flex: 1,
                            marginHorizontal: spacing[2],
                          }}></View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: 'black',
                              textAlign: 'center',
                            }}>
                            {item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignContent: 'space-between',
                }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 1 }}>
                  افزودن به لیست مورد علاقه
                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                  <ToggleSwitch
                    isOn={addToFavorite}
                    onColor="#979797"
                    offColor="#4CD964"
                    size="small"
                    onToggle={() => changeAddToFavorite(!addToFavorite)}
                  />
                </View>
              </View>
              <Space />
              <Space />
              <GradientButton
                title={'ادامه'}
                onPress={() => {
                  console.log(selectedZone);
                  console.log(title);
                }}
              />
              <Space />
              <Space />
            </View>
          </Screen>
          <Modal
            transparent
            statusBarTranslucent
            visible={deviceNameModalVisible}>
            <BlurBackground />
            <KeyboardAvoidingView
              behavior="height"
              style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}>
              <Pressable
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onPress={() => {
                  changeDeviceNameVisible(false);
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginHorizontal: spacing[2],
                  paddingHorizontal: spacing[5],
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: spacing[2],
                  }}>
                  عنوان دستگاه
                </Text>
                <Space size={11} />
                <Divider
                  style={{ width: '40%', alignSelf: 'center' }}
                  width={2}
                  color={'#5A97FB'}
                />
                <Space />
                <Space />
                <Space />
                <Input
                  style={{
                    fontSize: 20,
                    flex: 1,
                    textAlign: 'right',
                    justifyContent: 'center',
                  }}
                  containerStyle={{}}
                  // value={}
                  // onChangeText={}
                  inputContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#5992FA',
                    borderRadius: 8,
                  }}
                  inputStyle={{ marginTop: 0, paddingTop: 1 }}
                  placeholder="عنوان جدید"
                  onChangeText={value => {
                    changeTempTitle(value);
                  }}
                />
                <GradientButton
                  title={'ذخیره'}
                  titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                  onPress={() => {
                    changeTitle(tempTitle);
                    changeDeviceNameVisible(false);
                  }}
                />
                <Space />
                <Space />
                <Space />
              </View>
            </KeyboardAvoidingView>
            <Space />
            <Space />
            <Space />
          </Modal>
          <Modal transparent statusBarTranslucent visible={addZoneModalVisible}>
            <BlurBackground />
            <KeyboardAvoidingView
              behavior="height"
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'flex-end',
                paddingBottom: spacing[4],
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
                  changeAddZoneModalVisible(false);
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginHorizontal: spacing[2],
                  paddingHorizontal: spacing[5],
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: spacing[2],
                  }}>
                  ایجاد اتاق{' '}
                </Text>
                <Space size={11} />
                <Divider
                  style={{ width: '40%', alignSelf: 'center' }}
                  width={2}
                  color={'#5A97FB'}
                />
                <Space />
                <Space />
                <Space />
                <Input
                  style={{
                    fontSize: 20,
                    flex: 1,
                    textAlign: 'right',
                    justifyContent: 'center',
                  }}
                  containerStyle={{}}
                  // value={}
                  // onChangeText={}
                  inputContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#5992FA',
                    borderRadius: 8,
                  }}
                  inputStyle={{ marginTop: 0, paddingTop: 1 }}
                  placeholder="عنوان جدید"
                  onChangeText={value => {
                    setZoneInput(value);
                  }}
                  value={zoneInput}
                  onSubmitEditing={() => editDeviceZone(zoneInput)}
                />
                <GradientButton
                  title={'ذخیره'}
                  titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                  onPress={handleSubmit}
                />
                <Space />
                <Space />
                <Space />
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});
