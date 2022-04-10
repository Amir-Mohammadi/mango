import React from 'react';
import { PermissionsAndroid, Platform, Pressable, View } from 'react-native';
import { Divider } from 'react-native-elements';
import {
    Asset,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { Text } from '../../../components';
import { styles } from './change-profile-picture.style';

export type ChangeProfilePictureProps = {
  inputChangeHandler?: () => void;
  errorMessage?: string;
  onClickAddImage?: (image: Asset) => void;
};

export const ChangeProfilePicture: React.FC<ChangeProfilePictureProps> =
  props => {
    const handleSelectImageFromGallery = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 1,
        },
        response => {
          if (response?.assets?.[0])
            props.onClickAddImage?.(response?.assets?.[0]);
        },
      );
    };

    const handleTakePicture = async () => {
      await getCameraPermission();
      launchCamera(
        {
          mediaType: 'photo',
          maxHeight: 300,
          maxWidth: 300,
          cameraType: 'front',
        },
        response => {
          if (response?.assets?.[0])
            props.onClickAddImage?.(response?.assets?.[0]);
        },
      );
    };

    return (
      <View style={styles.CONTAINER}>
        <View style={styles.CARD}>
          <Text style={styles.TITLE}>{'تغییر تصویر پروفایل'}</Text>
          <Divider
            color="#5782F8"
            inset={true}
            insetType="middle"
            style={styles.DIVIDER}
            width={2}
          />
          <Pressable
            style={styles.FIRST_BUTTON}
            onPress={() => {
              handleTakePicture();
            }}
            android_ripple={{ color: 'rgba(96,193,255,.075)' }}>
            <Text style={styles.BUTTON_TEXT}> {'گرفتن عکس'}</Text>
          </Pressable>
          <Divider style={styles.DIVIDER} />
          <Pressable
            style={styles.NOT_FIRST_BUTTON}
            android_ripple={{ color: 'rgba(96,193,255,.075)' }}
            onPress={() => {
              handleSelectImageFromGallery();
            }}>
            <Text style={styles.BUTTON_TEXT}>{'انتخاب از گالری'}</Text>
          </Pressable>
          <Divider style={styles.DIVIDER} />
          <Pressable
            style={styles.NOT_FIRST_BUTTON}
            android_ripple={{ color: 'rgba(96,193,255,.075)' }}>
            <Text style={styles.DELETE_IMAGE_TEXT}>{'حذف تصویر فعلی'}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

export const getCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    console.error('Camera permission denied');
    return false;
  } else {
    return true; // on ios its not important
  }
};
