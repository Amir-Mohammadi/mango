import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../../../../../components/text/text';
import { Device, useStores } from '../../../../../stores';
import { spacing } from '../../../../../theme/spacing';

interface ZonesProps {
  onSelect?: (zoneName: string) => void;
  zones: string[];
  selectedZone?: string;
}

export const Zones: React.FC<ZonesProps> = observer(props => {
  const { deviceStore } = useStores();

  const mapOfDevice = new Map<string, Device[]>();

  const getZonesDevices = useCallback(
    (list: Device[]): Map<string, Device[]> => {
      const result = new Map<string, Device[]>();

      list.forEach(device => {
        var itemZone = device.zone;

        var exist = result.get(itemZone);
        if (exist === undefined) {
          if (itemZone !== '' || itemZone !== null || itemZone !== undefined)
            result.set(itemZone, [device]);
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

  return (
    <View
      style={{
        height: 41,
        overflow: 'hidden',
      }}>
      <FlatList
        style={{
          alignSelf: 'flex-start',
          alignContent: 'flex-start',
          flex: 1,
        }}
        numColumns={2}
        keyExtractor={item => item}
        data={props.zones}
        renderItem={({ index, item }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor:
                  item === props.selectedZone ? '#5D9FFB' : '#DCECFF',
                flexDirection: 'row-reverse',
                borderRadius: 12,
                height: 41,
                width: 86,
                paddingVertical: spacing[3],
                marginRight: spacing[5],
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => props.onSelect?.(item)}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 12,
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
  );
});
