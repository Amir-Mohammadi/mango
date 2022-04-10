import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import RNRestart from 'react-native-restart';
import { Button, Text } from '../../../components';
import { Space } from '../../../components/space/space';
import { spacing } from '../../../theme';
import { Storage } from '../../../utils/storage';

export type LogoutProps = {
  onConfirm?: () => void;
  onDismiss?: () => void;
};
export const LogOut: React.FC<LogoutProps> = () => {
  const logout = () => {
    Storage.clear();
    RNRestart.Restart();
  };

  return (
    <View style={CONTAINER}>
     
        <Text style={TEXT}>{'برای خروج از حساب کاربری مطمئن هستید؟'}</Text>
        <Space />
        <Space />

        <Button
          onPress={() => logout()}
          text="تایید"
          style={BUTTON}
          textStyle={BUTTON_TEXT}
        />
      </View>
  );
};

const CONTAINER: ViewStyle = {
  marginHorizontal: 50,
  marginBottom: 30,
  borderRadius: 10,
  elevation: 5,
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[3],
  backgroundColor: 'white',
};

const TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#373737',
};

const BUTTON: ViewStyle = {
  paddingVertical: spacing[1],
  backgroundColor: '#FC5E5E',
  marginHorizontal: spacing[6],
};

const BUTTON_TEXT: TextStyle = { fontSize: 20 };
