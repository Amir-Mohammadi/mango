import { ImageProps as DefaultImageProps, ImageURISource } from 'react-native';

export type ImageProps = DefaultImageProps & {
  source: ImageURISource;
};
