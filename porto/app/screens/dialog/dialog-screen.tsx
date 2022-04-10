import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import {
  AlertDialog,
  Header,
  InputDialog,
  QuestionDialog,
} from '../../components';
import { useStores } from '../../stores';
import { DialogType } from '../../stores/dialog/dialog-store.type';

export const DialogScreen: React.FC = observer(() => {
  const { dialogStore } = useStores();

  const onDismissHandler = () => {
    dialogStore.onDismiss();
    if (!dialogStore.dismissLock) {
      dialogStore.closeDialog();
    }
  };

  const onSubmitHandler = () => {
    dialogStore.onSubmit();
    dialogStore.closeDialog();
  };

  const onCancelHandler = () => {
    dialogStore.onCancel();
    dialogStore.closeDialog();
  };

  const onInputSubmitHandler = (value: string) => {
    dialogStore.onSubmitInput(value);
    dialogStore.closeDialog();
  };

  if (dialogStore.isVisible) {
    switch (dialogStore.dialogType) {
      case DialogType.alert: {
        return (
          <Fragment>
            <Header headerText="Dialog" leftIcon="back" />
            <View>
              <AlertDialog
                isVisible={dialogStore.isVisible}
                title={dialogStore.title}
                message={dialogStore.message}
                onDismiss={onDismissHandler}
                onSubmit={onSubmitHandler}
              />
            </View>
          </Fragment>
        );
      }
      case DialogType.question: {
        return (
          <Fragment>
            <Header headerText="Dialog" leftIcon="back" />
            <View>
              <QuestionDialog
                isVisible={dialogStore.isVisible}
                title={dialogStore.title}
                message={dialogStore.message}
                onDismiss={onDismissHandler}
                onSubmit={onSubmitHandler}
                onCancel={onCancelHandler}
              />
            </View>
          </Fragment>
        );
      }
      case DialogType.input: {
        return (
          <Fragment>
            <Header headerText="Dialog" leftIcon="back" />
            <View>
              <InputDialog
                keyboardType={dialogStore.keyboardType}
                isVisible={dialogStore.isVisible}
                title={dialogStore.title}
                secureTextEntry={dialogStore.inputSecureTextEntry}
                initialValue={dialogStore.inputInitialValue}
                placeholder={dialogStore.inputPlaceHolder}
                message={dialogStore.message}
                onDismiss={onDismissHandler}
                onSubmit={onInputSubmitHandler}
                onCancel={onCancelHandler}
                validationType={dialogStore.validationType}
              />
            </View>
          </Fragment>
        );
      }
      default:
        return null;
    }
  } else {
    return null;
  }
});
