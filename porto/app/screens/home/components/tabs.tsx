import React, { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TabBar, TabView } from 'react-native-tab-view';
import { DeviceListItem } from '../../../components/device-list-item/device-list-item';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { navigate } from '../../../navigators';
import { Device, DeviceType, useStores } from '../../../stores';

interface TabsProps {}

const getCategoriesDevices = (list: Device[]): Map<string, Device[]> => {
  const result = new Map<string, Device[]>();

  list.forEach(device => {
    var itemCategory = device.category;

    if (itemCategory === '') itemCategory = 'تعیین نشده';

    var exist = result.get(itemCategory);
    if (exist === undefined) {
      result.set(itemCategory, [device]);
    } else {
      exist.push(device);
    }
  });

  return result;
};

export const Tabs: React.FC<TabsProps> = props => {
  const { deviceStore } = useStores();

  const onSelectDeviceHandler = (
    deviceId: string,
    deviceType: DeviceType | null,
  ) => {
    deviceStore.setCurrentDeviceId(deviceId);

    switch (deviceType) {
      case DeviceType.fanSwitchV1:
        navigate('fanSwitch');
        break;
      case DeviceType.threePoleSwitchV1:
        navigate('comingSoon');
        break;
      case DeviceType.twoPoleSwitchV1:
        navigate('twoPoleSwitch');
        break;
    }
  };

  const renderScene = ({ route }): JSX.Element => {
    return (
      <FlatList
        numColumns={2}
        keyExtractor={route => route.id}
        data={deviceStore.deviceList}
        renderItem={itemData => {
          return (
            <DeviceListItem
              device={itemData.item}
              onSelect={() =>
                onSelectDeviceHandler(
                  itemData.item.id,
                  itemData.item.deviceType,
                )
              }
            />
          );
        }}
      />
    );
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState<{ key: string; title: string }[]>(
    [],
  );

  useEffect(() => {
    const categoriesDevices = getCategoriesDevices(deviceStore.deviceList);
    const categories = Array.from(categoriesDevices.keys());

    const X = categories.map(category => ({ key: category, title: category }));
    X.push({ key: 'همه', title: 'همه' });

    setRoutes(X);
  }, [deviceStore.deviceList]);

  return (
    <TabView
      showPageIndicator={false}
      lazy={true}
      sceneContainerStyle={{ paddingTop: 10 }}
      renderTabBar={props => (
        <View
          style={{
            flexDirection: 'row-reverse',
            alignContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{ flex: 2.5 }}>
            <TabBar
              indicatorStyle={{
                backgroundColor: '#5A97FB',
              }}
              scrollEnabled
              pressColor="transparent"
              style={{
                backgroundColor: 'white',
                elevation: 0,
                height: 50,
              }}
              labelStyle={{
                color: 'black',
                borderColor: '#5A97FB',
                shadowOpacity: 0,
                fontSize: 18,
              }}
              {...props}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <GradientButton
              onPress={() => navigate('deviceConfigStack')}
              text="افزودن دستگاه"
              textStyle={{
                fontSize: 11,
                fontFamily: 'IRANSans',
              }}
              containerStyle={{
                flex: 1,
                // paddingHorizontal: 5,
                paddingVertical: 3,
              }}
              buttonStyle={{
                flex: 1,

                borderRadius: 10,
              }}
            />
          </View>
        </View>
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={{ width: layout.width }}
    />
  );
};
