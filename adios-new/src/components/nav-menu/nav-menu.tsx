import { Image } from '@chakra-ui/image';
import { Center, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';


interface NavMenuProps {
  selected?: SelectedNavMenu;
  onChangeSelection?: (selected: SelectedNavMenu) => void;
}

enum SelectedNavMenu {
  Home = 0,
  Map = 1,
  Analysis = 2,
  Settings = 3,
}

const NavMenu: React.FC<NavMenuProps> = (props) => {
  const [selected, setSelected] = useState<SelectedNavMenu>(
    SelectedNavMenu.Home
  );

  useEffect(() => {
    if (props.selected !== undefined) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  useEffect(() => {
    props.onChangeSelection?.(selected);
  }, [selected]);

  return (
    <div style={{ flexDirection: 'row' }}>
      <Flex flexDirection={'column'} bg={'#355291'} w={'4.68vw'} h={'100%'}>
        <Image
          cursor={'pointer'}
          src="/images/Expand-NavMenu.png"
          mr={'43%'}
          objectFit={'contain'}
        />
        <Flex mt={'12.7vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              onClick={() => setSelected(SelectedNavMenu.Home)}
              src="/images/Home-NavMenu.svg"
              alignSelf={'center'}
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Home ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Home ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>

        <Flex mt={'12vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              onClick={() => setSelected(SelectedNavMenu.Map)}
              src="/images/Map-NavMenu.svg"
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Map ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Map ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>
        <Flex mt={'12vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              onClick={() => setSelected(SelectedNavMenu.Analysis)}
              src="/images/Analytics.svg"
              alignSelf={'center'}
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Analysis ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Analysis ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>
        <Flex mt={'12vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              onClick={() => setSelected(SelectedNavMenu.Settings)}
              src="/images/Settings.svg"
              alignSelf={'center'}
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Settings ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Settings ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>
        <Image
          objectFit={'contain'}
          cursor={'pointer'}
          onClick={() =>
            window.open('http://www.elevia.ir/Home/Index', '_blank')
          }
          src="/images/Elevia-NavMenu.png"
          mt={'2.6vh'}
          alignSelf={'center'}
          h={'12.3vh'}
        />
      </Flex>
    </div>
  );
};

export default NavMenu;
