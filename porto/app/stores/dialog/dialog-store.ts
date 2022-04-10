import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { KeyboardTypeOptions } from 'react-native';
import { ValidationType } from '../../components/validation-input/validation-input';
import {
  AlertDialogOption,
  DialogType,
  InputDialogOption,
  QuestionDialogOption,
} from './dialog-store.type';

/** Do Nothing. */
const noop = (): void => undefined;

export const DialogStoreModel = types
  .model({})
  .volatile(() => ({
    /**
     * dialog visible
     */
    isVisible: false,
    /**
     * dialog title
     */
    title: '',
    /**
     * dialog message
     */
    message: '',
    /**
     * dialog on submit input function
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmitInput: (_: string): void => undefined,

    /**
     * dialog on submit input
     */
    onSubmit: noop,
    /**
     * dialog on cancel function
     */
    onCancel: noop,
    /**
     * dialog on dismiss function
     */
    onDismiss: noop,

    keyboardType: 'default' as KeyboardTypeOptions,
    /**
     * dialog type
     */
    dialogType: DialogType.alert,
    /**
     * dialog input validation type
     */
    validationType: [] as ValidationType[],
    /**
     * dialog input initial value
     */
    inputInitialValue: '',
    /**
     * dialog input place holder
     */
    inputPlaceHolder: '',

    /**
     * dialog input place holder
     */
    dismissLock: false,

    /**
     * handleSecureInput
     */
    inputSecureTextEntry: false,
  }))
  .actions(self => ({
    showAlertDialog: (options: AlertDialogOption): void => {
      self.isVisible = true;
      self.onSubmit = options.onSubmit ? options.onSubmit : noop;
      self.onDismiss = options.onDismiss ? options.onDismiss : noop;
      self.title = options.title ?? '';
      self.message = options.message;
      self.dialogType = DialogType.alert;
      self.dismissLock = options.dismissLock ?? false;
    },

    showQuestionDialog: (options: QuestionDialogOption): void => {
      self.isVisible = true;

      self.onSubmit = options.onSubmit ? options.onSubmit : noop;

      self.onDismiss = options.onDismiss ? options.onDismiss : noop;
      self.onCancel = options.onCancel ? options.onCancel : noop;
      self.title = options.title ?? '';
      self.message = options.message;
      self.dialogType = DialogType.question;
      self.dismissLock = options.dismissLock ?? false;
    },

    showInputDialog: (options: InputDialogOption): void => {
      self.isVisible = true;
      self.keyboardType = options.keyboardType ?? 'default';
      self.onSubmitInput = options.onSubmit ? options.onSubmit : noop;
      self.onDismiss = options.onDismiss ? options.onDismiss : noop;
      self.onCancel = options.onCancel ? options.onCancel : noop;
      self.title = options.title ?? '';
      self.validationType = options.validationType;
      self.inputInitialValue = options.inputInitialValue ?? '';
      self.inputPlaceHolder = options.inputPlaceHolder ?? '';
      self.message = options.message ?? '';
      self.dialogType = DialogType.input;
      self.dismissLock = options.dismissLock ?? false;
      self.inputSecureTextEntry = options.inputSecureTextEntry ?? false;
    },
  }))
  .actions(self => ({
    openDialog: (): void => {
      self.isVisible = true;
    },
    closeDialog: (): void => {
      self.isVisible = false;
    },
  }));

type DialogStoreType = Instance<typeof DialogStoreModel>;
export interface DialogStore extends DialogStoreType {}
type DialogStoreSnapshotType = SnapshotOut<typeof DialogStoreModel>;
export interface DialogStoreSnapshot extends DialogStoreSnapshotType {}
