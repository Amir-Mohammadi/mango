import { useRedirectFromUrl } from '@/app/router';
import { SlideIn } from '@/components';
import Header from '@/components/Header/Header';
import { HomeListHeader } from '@/components/HomeListHeader/HomeListHeader';
import { useGetAssetsQuery } from '@/service/api/asset/asset-api';
import { Flex } from '@chakra-ui/react';
import { CSSObject } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NavMenu from '../../components/nav-menu/nav-menu';
import ScrollMenu from '../../components/scroll-view/ScrollMenu';




export const HomeScreen: React.FC = () => {
  const redirect = useRedirectFromUrl();
  const { t } = useTranslation();

  const assetsQuery = useGetAssetsQuery(undefined, {});

  return (
    <SlideIn>
      <Flex flexDirection={'column'} flex={1} bg={'#557BF5'}>
        <Flex>
          <Header isUnreadNotificationExist={false} />
        </Flex>
        <Flex flex={1}>
          <Flex>
            <Flex>
              <NavMenu />
            </Flex>
            <Flex w={'19vw'}>
              <ScrollMenu />
            </Flex>
          </Flex>
          <Flex
            flexDirection={'column'}
            w={'100%'}
            color={'white'}
            backgroundImage={'/background.svg'}
            backgroundRepeat={'no-repeat'}
          >
            <Flex flexDirection={'column'}>
              <HomeListHeader isHomeSelected={false} />
            </Flex>
            <Flex flex={1}>{/* <Welcome /> */}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </SlideIn>
  );
};

const CONTAINER: CSSObject = {
  flex: 1,
  color: 'white',
  backgroundImage: '/login-screen-background.jpg',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const FLEX: CSSObject = {
  flex: 1,
  paddingTop: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
