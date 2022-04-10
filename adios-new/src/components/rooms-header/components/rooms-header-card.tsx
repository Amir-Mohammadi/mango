import { Image } from '@chakra-ui/image';
import { Center, Flex, Text, Tooltip } from '@chakra-ui/react';
import type { NextPage } from 'next';
import React from 'react';


interface RoomsHeaderCardsProps {
  name: string;
  count: number;
  temperature: number;
  onClick(): void;
  bg: string;
  selected: boolean;
}

const RoomsHeaderCards: NextPage<RoomsHeaderCardsProps> = (props) => {
  return (
    <Center
      sx={{ cursor: 'pointer' }}
      height="66px"
      w={'10vw'}
      minW={'193px'}
      alignContent={'center'}
      justifyContent={'space-between'}
      bg={props.selected ? props.bg : '#355291'}
      borderRadius={10}
      py={'10px'}
      pr={'0.75vw'}
      mx={'5px'}
      onClick={props.onClick}
    >
      <Flex flex={1}>
        <Image
          src={'/images/room-icon.svg'}
          objectFit={'contain'}
          // h={'67'}
          // w={'100%'}
        />
      </Flex>
      <Flex flexDirection={'column'} flex={1}>
        <Tooltip hasArrow label={props.name}>
          <Text color={'white'} fontSize={20} noOfLines={1}>
            {props.name}
          </Text>
        </Tooltip>
        <Text color={'white'} fontSize={11}>
          {props.count} دستگاه
        </Text>
      </Flex>
      <Flex flexDirection={'column'} flex={1}>
        <Text color={'white'} fontSize={16} pr={'0.75vw'}>
          {props.temperature}
          {'C'}
        </Text>
      </Flex>
    </Center>
  );
};

export default RoomsHeaderCards;
