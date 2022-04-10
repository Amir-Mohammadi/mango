import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Text } from '../../../components';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { useStores } from '../../../stores';
import { emailValidation } from '../../../utils/validation-functions';
import { styles } from './email-input.style';

type FormSchema = {
  email: string;
};
export type EmailInputProps = {
  inputChangeHandler: () => void;
  errorMessage: string;
  onConfirm?: (email: string) => void;
  onDismiss?: () => void;
};
export const EmailInput: React.FC<EmailInputProps> = props => {

  const {
    control,
    handleSubmit,
    formState: {  errors },
  } = useForm<FormSchema>({
    mode: 'onTouched',
    defaultValues: {
      email: undefined,
    },
  });
  const { userStore } = useStores();

  const myHandleSubmit = (data: FormSchema) => {
    props.onConfirm?.(data.email);
  };

  return (
    <Controller
      control={control}
      rules={{
        validate: value => {
          const res = emailValidation(value);
          if (res.isValid) return true;
          else return res.validationMessage;
        },
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.CONTAINER}>
          <View style={styles.CARD}>
            <Text style={styles.TITLE}>{'آدرس ایمیل'}</Text>
            <Divider
              color="#5782F8"
              inset={true}
              insetType="middle"
              style={styles.UNDERLINE}
              width={2}
            />
            <TouchableHighlight>
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                defaultValue={userStore.email}
                errorMessage={errors.email?.message}
                inputStyle={styles.INPUT}
                inputContainerStyle={styles.INPUT_CONTAINER}></Input>
            </TouchableHighlight>
            <GradientButton
              text="ذخیره"
              onPress={handleSubmit(myHandleSubmit)}
              style={styles.BUTTON_TEXT}
            />
          </View>
        </View>
      )}
      name="email"
    />
  );
};
