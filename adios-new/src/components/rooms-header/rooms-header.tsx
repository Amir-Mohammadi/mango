import { useGetAllDevicesQuery } from '@/service/api/device/device-api';
import { Flex, SkeletonCircle } from '@chakra-ui/react';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import RoomsHeaderCard from './components/rooms-header-card';




const getZonesDevices = (list: Device[] = []): Map<string, Device[]> => {
  const result = new Map<string, Device[]>();

  list.forEach((device) => {
    var itemZone = device.zone;
    if (itemZone === '' || itemZone === undefined || itemZone === null) {
      itemZone = null;
    }
    var exist = result.get(itemZone);
    if (exist === undefined) {
      result.set(itemZone, [device]);
    } else {
      exist.push(device);
    }
  });
  return result;
};

interface Device {
  id: string;
  name: string;
  label: string;
  type: string;
  managerId: string;
  assetId: string;
  assetLabel: string;
  zone: string;
  deviceData: {
    configuration: {
      type: string;
    };
    transportConfiguration: {
      type: string;
    };
  };
  deviceProfileId: string;
}
interface RoomsHeaderProps {}
const RoomsHeader: NextPage<RoomsHeaderProps> = (props) => {
  const devicesQuery = useGetAllDevicesQuery({
    assetId: 'f89b6ce0-7ea2-11ec-b5c6-494c371367cd',
  });

  const zonesDevices = getZonesDevices(devicesQuery.data);
  const zones = Array.from(zonesDevices);
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Flex
      style={{
        backgroundColor: 'white',
        display: 'flex',
        paddingTop: '0.5%',
        paddingBottom: '0.5%',
        paddingRight: '1vw',
        flex: 1,
        flexDirection: 'row',
      }}
    >
      {/* {<RoomsHeaderCard name={'اتاق 1'} count={5} temperature={22} /> || (
        <Skeleton count={10} />
      )} */}

      {zones.map((zone) => {
        return (
          (
            <RoomsHeaderCard
              onClick={() => {
                setSelectedZone(zone[0]);
                setSelected(true);
              }}
              bg={selectedZone === zone[0] ? '#355291' : '#99A8C8'}
              name={zone[0] ?? 'تعیین نشده '}
              selected={selected}
              count={zonesDevices.get(zone[0])?.length}
              temperature={22}
            />
          ) || <SkeletonCircle />
        );
      })}
    </Flex>
  );
};

export default RoomsHeader;
