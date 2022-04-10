import { ChevronDownIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import {
  Center,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import React, { useState } from 'react';


interface HeaderProps {
  isUnreadNotificationExist: boolean;
}
const Header: NextPage<HeaderProps> = (props) => {
  const [isUnreadNotificationExist, setIsUnreadNotificationExist] =
    useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: '#355291',
        paddingTop: '0.3%',
        paddingBottom: '0.3%',
        flexDirection: 'row',
        width: '100%',
      }}
      dir={'ltr'}
    >
      <Flex>
        <Menu autoSelect={false}>
          <MenuButton
            flexDirection={'row-reverse'}
            alignContent={'center'}
            h="48px"
            ml={'3.5%'}
          >
            <Flex flexDirection={'row'}>
              <Image
                src="/images/Avatar.png"
                borderRadius={150}
                alignSelf={'center'}
                w="48px"
                h="48px"
              />
              <ChevronDownIcon
                w={8}
                h={8}
                color="#A4AFB7"
                alignSelf={'center'}
              />
              <Text alignSelf={'center'} color={'white'}>
                {'نام  نام خانوادگی'}{' '}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem
              fontWeight="bold"
              flexDirection={'row-reverse'}
              color={'black'}
              onClick={() =>
                setIsUnreadNotificationExist(!isUnreadNotificationExist)
              }
            >
              متن نمونه
            </MenuItem>
            <MenuDivider mr={'5%'} ml={'5%'} />
            <MenuItem
              fontWeight="bold"
              flexDirection={'row-reverse'}
              color={'black'}
            >
              متن نمونه
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontWeight="bold"
              flexDirection={'row-reverse'}
              color={'black'}
            >
              ویرایش پروفایل
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontWeight="bold"
              flexDirection={'row-reverse'}
              color={'black'}
            >
              خروج
            </MenuItem>
          </MenuList>
        </Menu>
        <Center height="50px" alignContent={'center'} justifyContent={'center'}>
          <Divider
            orientation="vertical"
            borderWidth={1}
            color={'white'}
            opacity={1}
            margin={5}
            height={'50%'}
          />
        </Center>
        <Image
          onClick={() =>
            setIsUnreadNotificationExist(props.isUnreadNotificationExist)
          }
          src={
            isUnreadNotificationExist
              ? '/images/Notification.png'
              : '/images/No-Notification.png'
          }
          w="32px"
          h="35px"
          alignSelf={'center'}
          objectFit={'contain'}
          fit={'contain'}
        />
      </Flex>
    </div>
  );
};

export default Header;
