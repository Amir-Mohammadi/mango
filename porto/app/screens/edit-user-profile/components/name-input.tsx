import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { Text } from '../../../components';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { Space } from '../../../components/space/space';
import { useStores } from '../../../stores';
import { nameValidation } from '../../../utils/validation-functions';
import { styles } from './name-input.style';

type FormSchema = {
  firstName: string;
  lastName: string;
};
export type NameInputProps = {
  inputChangeHandler: () => void;
  errorMessage: string;
  onConfirm?: (firstName: string, lastName: string) => void;
  onDismiss?: () => void;
};
export const NameInput: React.FC<NameInputProps> = props => {
  const { userStore } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    mode: 'onTouched',
    defaultValues: {
      firstName: userStore.firstName,
      lastName: userStore.lastName,
    },
  });


  const myHandleSubmit = (data: FormSchema) => {
    props.onConfirm?.(data.firstName, data.lastName);
    console.log(data.firstName, data.lastName);
  };

  return (
    <View style={styles.CONTAINER}>
      <View style={styles.CARD}>
        <Text style={styles.TITLE}>{'ویرایش پروفایل'}</Text>
        <Divider
          color="#5782F8"
          inset={true}
          insetType="middle"
          style={styles.UNDERLINE}
          width={2}
        />
        <Space />
        <Space />
        <Space />

        <Controller
          control={control}
          rules={{
            validate: value => {
              const res = nameValidation(value);
              if (res.isValid) return true;
              else return res.validationMessage;
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              textAlign="right"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.lastName?.message}
              inputStyle={styles.INPUT}
              inputContainerStyle={styles.INPUT_CONTAINER}
            />
          )}
          name="firstName"
        />

        <Controller
          control={control}
          rules={{
            validate: value => {
              const res = nameValidation(value);
              if (res.isValid) return true;
              else return res.validationMessage;
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              textAlign="right"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={userStore.lastName}
              errorMessage={errors.lastName?.message}
              inputStyle={styles.INPUT}
              inputContainerStyle={styles.INPUT_CONTAINER}
            />
          )}
          name="lastName"
        />
        <GradientButton
          text="ذخیره"
          onPress={handleSubmit(myHandleSubmit)}
          style={styles.BUTTON}
        />
      </View>
    </View>
  );
};
