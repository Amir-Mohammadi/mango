import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useReducer, useState } from 'react';
import { Image, ImageBackground, StatusBar, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Text } from '../../components';
import { Space } from '../../components/space/space';
import {
    ValidationInput,
    ValidationType
} from '../../components/validation-input/validation-input';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { spacing } from '../../theme/spacing';
import { styles } from './register-screen.style';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.values,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.validates,
      [action.input]: {
        isValid: action.isValid,
        validationMessage: action.validationMessage,
      },
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key].isValid;
    }
    return {
      formIsValid: updatedFormIsValid,
      validates: updatedValidities,
      values: updatedValues,
    };
  }

  return state;
};

export const RegisterScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'register'>
> = observer(props => {
  const { authStore } = useStores();
  const { navigation } = props;

  const [formValidationDisplay, setFormValidationDisplay] =
    useState<boolean>(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      firstName: '',
      lastName: '',
    },
    validates: {
      firstName: { isValid: false, validationMessage: '' },
      lastName: { isValid: false, validationMessage: '' },
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity, validationMessage) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        validationMessage: validationMessage,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const validationMessage = (input: any): string => {
    return !input.isValid && formValidationDisplay && input.validationMessage;
  };

  const onSubmitHandler = () => {
    if (!formState.formIsValid) {
      setFormValidationDisplay(true);
      return;
    }

    authStore.register(formState.values.firstName, formState.values.lastName);
  };

  return (
    <View style={styles.CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/Background.png')}
        resizeMode="cover"
        imageStyle={styles.IMAGE_BACKGROUND_IMAGE}
        style={styles.IMAGE_BACKGROUND_CONTAINER}>
        <SafeAreaView style={styles.CONTAINER}>
          <Screen
            backgroundColor="transparent"
            style={styles.SCREEN}
            variant="scroll">
            <View>
              <View style={styles.CARD_CONTAINER}>
                <Card.Title style={styles.CARD_TITLE}>ورود / عضویت </Card.Title>
                <Card.Divider
                  color="#5782F8"
                  inset={true}
                  insetType="middle"
                  style={styles.CARD_DIVIDER}
                  width={2}
                />
                <View style={styles.CARD_IMAGE_CONTAINER}>
                  <Image
                    style={styles.CARD_IMAGE}
                    source={require('../../assets/images/Name.png')}
                  />
                </View>
                <View>
                  <ValidationInput
                    identifier="firstName"
                    inputStyle={styles.INPUT}
                    inputContainerStyle={styles.INPUT_CONTAINER}
                    placeholder={' نام'}
                    onInputChange={inputChangeHandler}
                    validationTypes={[ValidationType.required]}
                    errorMessage={validationMessage(
                      formState.validates.firstName,
                    )}
                    // errorStyle={styles.ERROR_MESSAGE}
                  ></ValidationInput>

                  <ValidationInput
                    identifier="lastName"
                    onInputChange={inputChangeHandler}
                    inputStyle={styles.INPUT}
                    inputContainerStyle={styles.INPUT_CONTAINER}
                    placeholder=" نام خانوادگی"
                    validationTypes={[ValidationType.required]}
                    errorMessage={validationMessage(
                      formState.validates.lastName,
                    )}
                    // errorStyle={styles.ERROR_MESSAGE}
                  ></ValidationInput>
                </View>
                <Text style={styles.TERMS_OF_SERVICE}>
                  ادامه، به منزله پذیرش{' '}
                  <Text
                    onPress={() => navigation.navigate('login')}
                    style={styles.LINK}>
                    شرایط و مقررات
                  </Text>{' '}
                  می باشد
                </Text>

                <Space size={spacing[1]} />
                <Button
                  loading={!!authStore.isLoading}
                  ViewComponent={LinearGradient}
                  buttonStyle={styles.BUTTON}
                  onPress={onSubmitHandler}
                  containerStyle={styles.BUTTON_CONTAINER}
                  linearGradientProps={{
                    colors: ['#5EBCFD', '#567CF8'],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0 },
                  }}
                  title="ادامه"
                  titleStyle={styles.BUTTON_TITLE}
                />
                <Space size={spacing[2]} />
              </View>
            </View>
          </Screen>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});
