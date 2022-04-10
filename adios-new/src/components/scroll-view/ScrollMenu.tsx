import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import MenuButton from '../menu-button/MenuButton';



interface ScrollMenuProps {
  // onChangeSelection?: (selected: SelectedNavMenu) => void;
}

const ScrollMenu: React.FC<ScrollMenuProps> = (props) => {
  return (
    <Flex flexDirection={'column'} bgGradient="linear(to-t, #5EBDFD, #567CF8)">
      <Flex>
        <Image
          src="/images/Elehome.svg"
          h={'6.38vh'}
          w={'58.35vw'}
          fit={'contain'}
          mt={'12.46vh'}
        />
      </Flex>
      <Flex
        scrollBehavior={'initial'}
        style={{
          paddingRight: '1.3vw',
          paddingLeft: '1.3vw',
          marginTop: '5.9vh',
          flexDirection: 'column',
        }}
      >
        <MenuButton title="ویرایش پروفایل" imageSrc="/images/EditProfile.svg" />
        <MenuButton title="اعلانات" imageSrc="/images/Notification.svg" />
        <MenuButton
          title="مدیریت خانه ها"
          imageSrc="/images/Notification.svg"
        />
        <MenuButton title="تنظیمات عمومی" imageSrc="/images/Settings.svg" />
        <MenuButton title="تنظیمات عمومی" imageSrc="/images/Settings.svg" />
        <MenuButton title="تنظیمات عمومی" imageSrc="/images/Settings.svg" />
        <MenuButton title="تنظیمات عمومی" imageSrc="/images/Settings.svg" />
      </Flex>
    </Flex>
  );
};

export default ScrollMenu;
