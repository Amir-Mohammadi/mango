import React, { Fragment, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { Divider } from 'react-native-elements';
import { Text } from '../../../components';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { PhoneNumberInput } from '../../../components/phone-number-input/phone-number-input';
import { Space } from '../../../components/space/space';
import { styles2 } from '../../../screens/verify-password/verify-password-screen.styles';
import { useStores } from '../../../stores';
import { getPhoneNumberUri } from '../../../utils/phone-number';
import { phoneValidation } from '../../../utils/validation-functions';
import { styles } from './change-phone-number.style';

type FormSchema = {
  phoneNumber: string;
  verificationCode: string;
};
export type PhoneNumberInputProps = {
  onFinish?: () => void;
};
export const ChangePhoneNumber: React.FC<PhoneNumberInputProps> = props => {
  const { userStore, authStore } = useStores();

  const { control, formState, handleSubmit } = useForm<FormSchema>({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      verificationCode: '',
    },
  });

  const resendVerificationCode = () => {
    setIsCodeExpired(false);
  };

  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const [codeFieldValue, setCodeFieldValue] = useState<string>('');

  const [step, setStep] = useState(0);

  const [focus, setFocus] = useState(true);

  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeFieldValue,
    setValue: setCodeFieldValue,
  });

  const buttonIsDisabled = codeFieldValue.length !== 5 && !isCodeExpired;

  const handleButton = async (data: FormSchema) => {
    if (step === 0) {
      const formatterPhoneNumber = getPhoneNumberUri(data.phoneNumber);

      if (!formatterPhoneNumber) {
        console.log('phoneNumber');
        return;
      }

      userStore.changeUserPhoneProfile(formatterPhoneNumber);

      setStep(1);
      return;
    }

    if (step === 1) {
      if (isCodeExpired) {
        resendVerificationCode();
        return;
      }

      await userStore.verifyUserPhoneProfile(codeFieldValue);
      setStep(2);
      return;
    }

    if (step === 2) {
      props.onFinish?.();
      return;
    }
  };

  const isValid = () => {
    if (step === 0) return formState.isValid;
    if (step === 1) return true;
    return true;
  };

  const changeText = (text: string) => {
    setCodeFieldValue(text);
  };

  const ref = useBlurOnFulfill({
    value: codeFieldValue,
    cellCount: 5,
  });

  const renderContent = useCallback(() => {
    if (step === 0) {
      return (
        <PhoneNumberInput
          controllerProps={{
            control: control,
            rules: {
              validate: phoneValidation,
            },
            name: 'phoneNumber',
          }}
        />
      );
    }

    if (step === 1) {
      return (
        <View style={styles2.CODE_FIELD}>
          <CodeField
            ref={ref}
            {...cellOnLayout}
            autoFocus={focus}
            value={codeFieldValue}
            onChangeText={changeText}
            cellCount={5}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            editable={!isCodeExpired}
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <Text
                  key={`value-${index}`}
                  style={[
                    styles2.CELL,
                    isFocused && styles2.FOCUS_CELL,
                    isCodeExpired && styles2.EXPIRED_CODE_INPUT,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </Fragment>
            )}
          />
        </View>
      );
    }

    if (step === 2) {
      return (
        <View>
          <Text>شماره جدید با موفقیت ثبت شد</Text>
        </View>
      );
    }

    return null;
  }, [step, codeFieldValue]);

  return (
    <View style={styles.CONTAINER}>
      <View style={styles.CARD}>
        <Text style={styles.TITLE}>{'درج شماره موبایل جدید'}</Text>
        <Space />

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
        {renderContent()}
        <Space />
        <Space />

        <GradientButton
          disabled={!isValid()}
          onPress={handleSubmit(handleButton)}
          text={step === 2 ? 'باشه' : 'ادامه'}
          style={styles.BUTTON_TEXT}
        />
      </View>
    </View>
  );
};
