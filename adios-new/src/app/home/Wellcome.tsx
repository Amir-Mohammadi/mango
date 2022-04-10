import {
  Button,
  Center,
  Divider,
  Flex,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

function Welcome(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Flex
      maxW="50vw"
      flex={1}
      flexDir={'column'}
      p={10}
      spacing={10}
      alignItems="flex-start"
    >
      <VStack spacing={3} alignSelf="center" alignItems="center">
        <Heading alignSelf={'center'} flex={1}>
          {t('auth:login.aboutTitle')}
        </Heading>
      </VStack>
      <Divider
        borderRadius={'full'}
        alignSelf={'center'}
        borderColor={'#5782F8'}
        borderWidth={5}
        width={120}
      />
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <Text textAlign={'justify'}>{t('auth:login.description')}</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Button size="lg" w={'full'} bgColor={'#284070'}>
              {t('auth:login.actions.website')}
            </Button>
          </Center>
        </GridItem>
        <GridItem colSpan={2} flexGrow={1}>
          <Center justifyContent={'space-between'}>
            <Image
              src={'/download-from-app-store.png'}
              alt="iOS"
              height={'auto'}
              maxWidth={222}
              width={'50%'}
            />
            {/* <div style={{ width: '50px' }}></div> */}

            <Image
              src={'/download-from-google-play.png'}
              alt="Android"
              height={'auto'}
              maxWidth={222}
              width={'50%'}
            />
          </Center>
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
}

export default Welcome;
