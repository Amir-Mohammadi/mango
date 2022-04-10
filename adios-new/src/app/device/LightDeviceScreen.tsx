import { useMediaQuery } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import React, { useState } from 'react';
import { LightDevice } from '../device/LightDevice';



const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

export const LightDeviceScreen: React.FC = () => {
  const [isSmallerThanTwoColumn] = useMediaQuery('(max-width: 728px)');

  console.log(isSmallerThanTwoColumn);
  const [charge, setCharge] = useState(true);
  const [beep, setBeep] = useState(true);
  const [buttonOne, setButtonOne] = useState(false);

  const devices = getDevices();

  const getScaleWithArea = (
    deviceLength: number,
    index: number,
    isSmallerThanTwoColumn: boolean
  ): '1x' | '2x' => {
    if (isSmallerThanTwoColumn) return '1x';

    return deviceLength % 4 && deviceLength - 1 === index ? '2x' : '1x';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {devices.map((device, index) => {
        return (
          <LightDevice
            charge={charge}
            onClickCharge={() => setCharge(!charge)}
            beep={beep}
            onClickBeep={() => setBeep(!beep)}
            buttonOne={buttonOne}
            onClickButtonOne={() => setButtonOne(!buttonOne)}
            scale={getScaleWithArea(
              devices.length,
              index,
              isSmallerThanTwoColumn
            )}
          />
        );
      })}
    </div>
  );
};

const getDevices = () => {
  return [
    {
      id: 1,
      title: 'hell',
    },
    {
      id: 2,
      title: 'hell',
    },
    {
      id: 3,
      title: 'hell',
    },
    {
      id: 3,
      title: 'hell',
    },
    {
      id: 3,
      title: 'hell',
    },
  ];
};
