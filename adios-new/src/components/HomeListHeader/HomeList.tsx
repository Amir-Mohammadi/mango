import { useGetAssetsQuery } from '@/service/api/asset/asset-api';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';



const renderPerson = (person, idx) => {
  return (
    <Flex key={idx} flexDirection={'row'}>
      <Box
        bg={'white'}
        w={'10vw'}
        mt={'2.6vh'}
        borderTopRadius={'20'}
        ml={'20px'}
        py={'10px'}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#355291',
          }}
          fontSize={25}
          justifySelf={'center'}
          flex={1}
        >
          {person.firstName}
        </Text>
      </Box>
    </Flex>
  );
};

export const HomeList = () => {
  const assetsQuery = useGetAssetsQuery(undefined, {});

  useEffect(() => {
    if (assetsQuery.data != undefined) setSelectedId(assetsQuery.data[0].id);
  }, [assetsQuery.data]);

  const [selectedId, setSelectedId] = useState<string>('');

  if (assetsQuery.isLoading) {
    return <ScrollContainer>is Loading...</ScrollContainer>;
  }

  return (
    <ScrollContainer style={{ flexDirection: 'row-reverse' }}>
      <Flex>
        {assetsQuery.data?.map((home) => {
          return (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setSelectedId(home.id)}
              bg={selectedId === home.id ? 'white' : '#355291'}
              minW={'10vw'}
              mt={'2.6vh'}
              borderTopRadius={'20'}
              ml={'20px'}
              py={'1.25vh'}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: selectedId === home.id ? '#355291' : 'white',
                }}
                fontSize={25}
                justifySelf={'center'}
                flex={1}
                noOfLines={1}
              >
                {home.label}
              </Text>
            </Box>
          );
        })}
      </Flex>
    </ScrollContainer>
  );
};
