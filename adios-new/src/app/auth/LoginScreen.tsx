import { SlideIn } from '@/components';
import { Box, Flex } from '@chakra-ui/react';
import { CSSObject } from '@emotion/react';
import { default as React } from 'react';
import { LoginComponent } from './LogingForm';
import { Welcome } from './Wellcome';

export const LoginScreen: React.FC = () => {
  return (
    <SlideIn>
      <Flex sx={CONTAINER}>
        <Flex sx={{ ...FLEX, backgroundColor: '#0004' }}>
          <Box sx={{ maxW: '70%' }} px={'0px'}>
            <Welcome />
          </Box>
        </Flex>
        <Flex sx={{ ...FLEX, backgroundColor: '#0004' }}>
          <LoginComponent />
          {/* <LightDeviceScreen /> */}
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
  minWidth: '1024px',
};

const FLEX: CSSObject = {
  flex: 1,
  paddingTop: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
