import { Center, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';


export const Weather = (props) => {
  const APIKEY = '8ab08677fa8d25e1a855c8bc6bfd6e11';

  const userPosition = (Latg: string) => {
    return new Promise<number>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          //'pos' return object has many properties we can grab
          var geoLat = pos.coords.latitude.toFixed(5);
          var geoLng = pos.coords.longitude.toFixed(5);
          var geoAcc = pos.coords.accuracy.toFixed(1);

          if (Latg === 'lat') {
            resolve(122);
            return parseInt(geoLat);
          }
          if (Latg === 'lng') {
            resolve(123123);
            return parseInt(geoLng);
          }
        });
      } else {
        //false
        alert('geolocation not available?! What browser is this?');
        reject();
        // prompt for city?
      }
    });
    //Check if the geolocation API exist
  };

  // const { weather } = useWeather()

  const [weather, setWeather] = useState<{ data?: weatherData }>({
    data: undefined,
  });

  async function weatherData(e: any) {
    const userLat = await userPosition('lat');
    const userLon = await userPosition('lng');
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=38&lon=46&appid=${APIKEY}&lang=fa`
    )
      .then((res) => res.json())
      .then((data) => data);

    console.log('##########' + data);

    setWeather({ data: data });
  }

  useEffect(() => {
    const userLat = userPosition('lat');
    const userLon = userPosition('lng');
    const data = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=38&lon=46&appid=${APIKEY}&lang=fa`
    )
      .then((res) => res.json())
      .then((data) => data);

    console.log('###222#######' + JSON.stringify(data));
  });

  return (
    <Flex>
      <Center
        bg={'#001C5309'}
        onClick={(e) => weatherData(e)}
        padding={2}
        borderRadius={50}
      >
        <Image
          objectFit={'contain'}
          fit={'contain'}
          src={`http://openweathermap.org/img/wn/${weather?.data?.weather?.[0].icon}@2x.png`}
          alt="آب و هوا"
          w={'44px'}
          h={'44px'}
          fontSize={12}
          color={'white'}
          title={
            `${weather?.data?.name}` +
            '\n' +
            `${weather?.data?.weather?.[0].description}`
          }
        />
      </Center>
    </Flex>
  );
};

interface weatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
