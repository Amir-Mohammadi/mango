import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ImageBackground, StatusBar, View } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PhoneNumberInput } from '../../components/phone-number-input/phone-number-input';
import { Screen } from '../../components/screen/screen';
import { Space } from '../../components/space/space';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { spacing } from '../../theme/spacing';
import { getPhoneNumberUri } from '../../utils/phone-number';
import { phoneValidation } from '../../utils/validation-functions';
import { styles } from './login-screen.styles';

type FormSchema = {
  phoneNumber: string;
};

export const LoginScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'login'>
> = observer(props => {
  const { authStore } = useStores();
  const { navigation } = props;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      authStore.resetCodeVerificationStates();
    }, []),
  );

  useEffect(() => {
    if (authStore.isWaitingForCodeVerification) {
      navigation.navigate('verifyPassword');
      console.log('WaitingForCodeVerification');
    }
  }, [authStore.isWaitingForCodeVerification]);

  const loginHandler = (data: FormSchema) => {
    const formatterPhoneNumber = getPhoneNumberUri(data.phoneNumber);

    if (!formatterPhoneNumber) {
      console.log('phoneNumber');
      return;
    }

    authStore.authenticate(formatterPhoneNumber);
  };

  return (
    <View style={styles.CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaProvider>
        <Screen style={styles.CONTAINER} variant="scrollView">
          <ImageBackground
            source={require('../../assets/images/Background.png')}
            resizeMode="cover"
            style={styles.IMAGE_BACKGROUND}>
            <View>
              <Card containerStyle={styles.CARD_CONTAINER}>
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
                    source={require('../../assets/images/phonenumber.png')}
                  />
                </View>
                <View style={styles.UP_INPUT_TEXT_CONTAINER}>
                  <Text style={styles.UP_INPUT_TEXT}>
                    جهت ادامه شماره موبایل خود را وارد نمایید
                  </Text>
                </View>

                <PhoneNumberInput
                  controllerProps={{
                    control: control,
                    name: 'phoneNumber',
                    rules: {
                      validate: phoneValidation,
                    },
                  }}
                />

                <Space size={spacing[3]} />
                <Button
                  loading={authStore.isLoading}
                  ViewComponent={LinearGradient}
                  buttonStyle={styles.BUTTON}
                  disabledTitleStyle={styles.DISABLED_BUTTON}
                  disabled={!isValid}
                  onPress={handleSubmit(loginHandler)}
                  containerStyle={styles.BUTTON_CONTAINER}
                  linearGradientProps={
                    isValid
                      ? {
                          colors: ['#5EBCFD', '#567CF8'],
                          start: { x: 0, y: 0 },
                          end: { x: 1, y: 0 },
                        }
                      : {
                          colors: ['#979797', '#979797'],
                          start: { x: 0, y: 0 },
                          end: { x: 1, y: 0 },
                        }
                  }
                  title="ادامه"
                  titleStyle={styles.BUTTON_TITLE}
                />
                <Space size={spacing[2]} />
              </Card>
            </View>
          </ImageBackground>
        </Screen>
      </SafeAreaProvider>
    </View>
  );
});
interface State {
  values: {
    phoneNumber: string;
  };
  validates: {
    phoneNumber: {
      isValid: boolean;
      validationMessage: string;
    };
  };
  formIsValid: boolean;
}

interface Action {
  input: string;
  type: any;
  validationMessage: string;
  isValid: boolean;
  value: string;
}
