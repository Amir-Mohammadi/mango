import { observer } from 'mobx-react-lite';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../../../../components/text/text';
import { Device, useStores } from '../../../../stores';
import { spacing } from '../../../../theme/spacing';

interface ZoneDeviceCountProps {
  onPress?: (zoneName: string) => void;
}

export const ZoneDeviceCount: React.FC<ZoneDeviceCountProps> = observer(
  props => {
    const { deviceStore } = useStores();

    const mapOfDevice = new Map<string, Device[]>();

    const getZonesDevices = (list: Device[]): Map<string, Device[]> => {
      const result = new Map<string, Device[]>();

      list.forEach(device => {
        var itemZone = device.zone;

        var exist = result.get(itemZone);
        if (exist === undefined) {
          result.set(itemZone, [device]);
        } else {
          exist.push(device);
        }
      });

      return result;
    };

    const zonesDevices = getZonesDevices(deviceStore.deviceList);
    const zones = Array.from(zonesDevices.keys());

    return (
      <View
        style={{
          height: 65,
          overflow: 'hidden',
        }}>
        <FlatList
          style={{ alignSelf: 'flex-end' }}
          numColumns={2}
          keyExtractor={item => item}
          data={zones}
          renderItem={({ index, item }) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  flexDirection: 'row-reverse',
                  borderRadius: 12,
                  height: 65,
                  width: 120,
                  paddingRight: spacing[5],
                  paddingLeft: spacing[1],
                  paddingVertical: spacing[3],
                  marginRight: spacing[2],
                }}
                onPress={() => props.onPress?.(item)}>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    marginHorizontal: spacing[2],
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../../assets/images/room-icon.png')}
                    style={{
                      width: 24,
                      height: 25,
                      justifyContent: 'center',
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 12, color: 'white' }}>
                    {item ? item : 'تعیین نشده'}
                  </Text>
                  <Text style={{ fontSize: 9, color: 'white' }}>
                    {zonesDevices.get(item)?.length + 'دستگاه '}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  },
);
