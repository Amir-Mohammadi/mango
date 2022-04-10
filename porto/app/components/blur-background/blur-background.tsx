import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { styles } from './blur-background-style';
import { BlurBackgroundProps } from './blur-background.props';

const BlurBackground: React.FC<BlurBackgroundProps> = props => {
  return <BlurView blurAmount={8} blurType="light" style={styles.absolute} />;
};

export { BlurBackground };
