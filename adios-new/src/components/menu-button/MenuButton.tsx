import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';


interface MenuButtonProps {
  // onChangeSelection?: (selected: SelectedNavMenu) => void;
  title: string;
  onClick?: () => void;
  imageSrc?: string;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <Box
      dir="ltr"
      onClick={props.onClick}
      h={'9vh'}
      mb={'1vh'}
      style={{
        background: '#00000040',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        alignContent: 'space-between',
      }}
    >
      <HStack
        alignContent={'space-between'}
        flexDirection={'row-reverse'}
        paddingY={'1vh'}
        paddingX={'1vw'}
      >
        <HStack>
          <Text
            dir="rtl"
            color={'white'}
            noOfLines={1}
            fontSize={['sm', 'md', 'lg', 'xl']}
            style={{
              marginRight: '1vw',
            }}
          >
            {props.title}
          </Text>
          <Image src={props.imageSrc} w={'2vw'} h={'3.5vh'} />
        </HStack>
        <div style={{ alignSelf: 'center' }}>
          <ChevronLeftIcon color={'white'} h={'5vh'} w={'2vw'} />
        </div>
      </HStack>
    </Box>
  );
};

export default MenuButton;
