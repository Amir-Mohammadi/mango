import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const DrawerIcon = (props: SvgProps) => (
  <Svg width={55.935} height={115} viewBox="0 0 55.935 115" {...props}>
    <Path
      data-name="Path 50097"
      d="M0 0h9.322c25.744 0 46.613 25.744 46.613 57.5S35.066 115 9.322 115H0Z"
      fill="#fbfbff"
    />
    <Path
      data-name="Icon open-menu"
      d="M14.317 46.607v3.413h11.824v-3.413Zm0 10.135v3.413h27.3v-3.413ZM26.141 66.98v3.413h15.476V66.98Z"
      fill="#5788f9"
    />
  </Svg>
);