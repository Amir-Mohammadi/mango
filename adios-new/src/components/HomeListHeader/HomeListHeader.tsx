import { Center, Flex, Text } from '@chakra-ui/react';
import moment from 'jalali-moment';
import type { NextPage } from 'next';
import React from 'react';
import { HomeList } from './HomeList';
import { Weather } from './weather';



const month = moment().locale('fa').format('MMMM');
const day = moment().locale('fa').format('D');
const year = moment().locale('fa').format('YYYY');
const StringDay = moment().locale('fa').format('ddd');
// import { DeviceType, useStores } from '../../stores/';
interface HomeListHeaderProps {
  isHomeSelected: boolean;
}
export const HomeListHeader: NextPage<HomeListHeaderProps> = (props) => {
  return (
    <Flex
      bgGradient="linear(to-l, #567EF8, #5EBDFD)"
      pr={'6vw'}
      style={{
        flexDirection: 'row-reverse',
        width: '100%',
      }}
      dir={'ltr'}
    >
      <Flex
        id="container"
        // pointerEvents={'fill'}
        // maxW={'64.58vw'}
      >
        <HomeList />
      </Flex>
      <Flex flex={1}>
        <Flex ml={'3vw'}>
          <Center>
            <Text fontSize={22} color={'white'}>
              {StringDay}
            </Text>

            <Text fontSize={22} color={'white'}>
              {'   ،   '}
            </Text>
            <Text fontSize={22} color={'white'}>
              {year}
            </Text>
            <Text fontSize={22} color={'white'}>
              {month}
            </Text>
            <Text fontSize={22} color={'white'}>
              {day}
            </Text>
          </Center>
        </Flex>
        <Flex>
          <Weather />
        </Flex>
      </Flex>
    </Flex>
  );
};
