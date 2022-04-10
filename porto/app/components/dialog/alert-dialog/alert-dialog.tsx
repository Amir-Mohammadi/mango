import React from 'react';
import { View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';
import { AlertDialogProps } from './alert-dialog.props';
import { styles } from './alert-dialog.style';

export const AlertDialog: React.FC<AlertDialogProps> = props => {
  return (
    <View>
      <Overlay
        overlayStyle={styles.DIALOG_CONTAINER}
        isVisible={props.isVisible}
        onBackdropPress={props.onDismiss}>
        {props.title !== '' && (
          <View style={styles.DIALOG_HEADER_CONTAINER}>
            <Text style={styles.DIALOG_HEADER_TEXT}>{props.title}</Text>
          </View>
        )}
        <View style={styles.DIALOG_BODY_CONTAINER}>
          <Text style={styles.DIALOG_BODY_TEXT}>{props.message}</Text>
        </View>
        <View style={styles.DIALOG_FOOTER_CONTAINER}>
          <View style={styles.DIALOG_FOOTER_BUTTON}>
            <Button title={'ok'} type={'clear'} onPress={props.onSubmit} />
          </View>
        </View>
      </Overlay>
    </View>
  );
};
