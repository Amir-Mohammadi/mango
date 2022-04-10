import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../theme';
import { SpaceProps } from './space.props';

const Space: React.FC<SpaceProps> = props => {
  const { horizontal = false, size = spacing[1] } = props;

  const marginVertical = horizontal === false ? size : 0;
  const marginHorizontal = horizontal === true ? size : 0;

  return (
    <View
      style={{
        marginHorizontal,
        marginVertical,
      }}
    />
  );
};

export { Space };
