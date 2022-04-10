import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { color } from '../../theme';
import { LoadingProps } from './loading.props';
import { styles } from './loading.style';

const Loading: React.FC<LoadingProps> = props => {
  return (
    <View style={[styles.CONTAINER, styles.HORIZONRAL]}>
      <ActivityIndicator {...props} color={color.palette.lightGrey} />
    </View>
  );
};

export { Loading };
