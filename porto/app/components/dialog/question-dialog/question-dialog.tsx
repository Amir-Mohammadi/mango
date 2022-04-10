import React from 'react';
import { View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';
import { QuestionDialogProps } from './question-dialog.props';
import { styles } from './question-dialog.style';

export const QuestionDialog: React.FC<QuestionDialogProps> = props => {
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
        <View style={styles.DIALOG_FOTTER_CONTAINER}>
          <View style={styles.DIALOG_FOTTER_BUTTON}>
            <Button title={'Cancel'} type={'clear'} onPress={props.onCancel} />
          </View>
          <View style={styles.DIALOG_FOTTER_BUTTON}>
            <Button title={'Ok'} type={'clear'} onPress={props.onSubmit} />
          </View>
        </View>
      </Overlay>
    </View>
  );
};
