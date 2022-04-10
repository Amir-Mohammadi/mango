import { useKeyboard } from '@react-native-community/hooks';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    View
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { Button, Card, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Screen } from '../../components/screen/screen';
import { Space } from '../../components/space/space';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { spacing } from '../../theme';
import { styles } from './verify-password-screen.styles';

const CELL_COUNT = 5;
const EXPIRATION_TIME = 120;

export const VerifyPasswordScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'verifyPassword'>
> = observer(props => {
  const { navigation } = props;

  const [seconds, setSeconds] = useState(EXPIRATION_TIME);
  const keyboard = useKeyboard();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(myInterval);
        setIsCodeExpired(true);
        setCodeFieldValue('');
        setFocus(false);
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const { authStore } = useStores();

  const buttonPressHandler = () => {
    if (isCodeExpired) {
      resendVerificationCode();
      return;
    }

    if (!buttonIsDisabled) {
      authStore.verifyAuthenticate(codeFieldValue);
      return;
    }
  };

  useEffect(() => {
    if (authStore.isLoggedIn) {
      props.navigation.navigate('home');
    }
  }, [authStore.isLoggedIn]);

  const resendVerificationCode = () => {
    setFocus(true);
    authStore.authenticate(authStore.userPhoneNumber);
    resetCounter();
    setIsCodeExpired(false);
  };

  useEffect(() => {
    if (authStore.isRequiredRegister) {
      navigation.navigate('register');
    }
  }, [authStore.isRequiredRegister]);

  const resetCounter = () => {
    setSeconds(EXPIRATION_TIME);
    setCodeFieldValue('');
  };

  const [codeFieldValue, setCodeFieldValue] = useState<string>('');

  const ref = useBlurOnFulfill({
    value: codeFieldValue,
    cellCount: CELL_COUNT,
  });

  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value: codeFieldValue,
    setValue: setCodeFieldValue,
  });

  const [focus, setFocus] = useState(true);

  const changeText = (text: string) => {
    setCodeFieldValue(text);
  };
  
  const buttonIsDisabled =
    codeFieldValue.length !== CELL_COUNT && !isCodeExpired;

  return (
    <Fragment>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <Screen
          keyboardShouldPersistTaps="handled"
          variant="scroll"
          style={styles.CONTAINER}>
          <ImageBackground
            source={require('../../assets/images/Background.png')}
            resizeMode="cover"
            style={styles.IMAGE_BACKGROUND}>
            <SafeAreaView style={{ flex: 1 }}>
              <View>
                <Card containerStyle={styles.CARD_CONTAINER}>
                  <Card.Title style={styles.CARD_TITLE}>
                    {'تایید شماره موبایل'}
                  </Card.Title>
                  <Card.Divider
                    color="#5782F8"
                    inset={true}
                    insetType="middle"
                    style={styles.CARD_DIVIDER}
                    width={2}
                  />
                  <View style={styles.CARD_IMAGE_CONTAINER}>
                    <Image
                      style={[
                        styles.CARD_IMAGE,
                        {
                          height: !keyboard.keyboardShown ? 200 : 0,
                          width: !keyboard.keyboardShown ? 200 : 0,
                        },
                      ]}
                      source={require('../../assets/images/code.png')}
                    />
                  </View>

                  <View style={styles.UP_INPUT_TEXT_CONTAINER}>
                    <Text style={styles.UP_INPUT_TEXT}>
                      کد پیامک شده را وارد نمایید
                    </Text>
                  </View>

                  <View style={styles.CODE_FIELD}>
                    <CodeField
                      ref={ref}
                      {...cellOnLayout}
                      autoFocus={focus}
                      value={codeFieldValue}
                      onChangeText={changeText}
                      cellCount={CELL_COUNT}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      editable={!isCodeExpired}
                      renderCell={({ index, symbol, isFocused }) => (
                        <Fragment key={index}>
                          <Text
                            key={`value-${index}`}
                            style={[
                              styles.CELL,
                              isFocused && styles.FOCUS_CELL,
                              isCodeExpired && styles.EXPIRED_CODE_INPUT,
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        </Fragment>
                      )}
                    />
                  </View>

                  {seconds > 0 ? (
                    <View style={styles.COUNTER_TEXT_CONTAINER}>
                      <Text style={styles.COUNTER_TEXT}>
                        امکان ارسال مجدد در {seconds} ثانیه{' '}
                      </Text>
                    </View>
                  ) : (
                    <Space size={spacing[4]} />
                  )}

                  <Button
                    loading={authStore.isLoading}
                    ViewComponent={LinearGradient}
                    buttonStyle={styles.BUTTON}
                    onPress={buttonPressHandler}
                    disabledTitleStyle={{
                      color: 'white',
                    }}
                    title={isCodeExpired ? 'ارسال مجدد' : 'ادامه'}
                    linearGradientProps={
                      !buttonIsDisabled
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
                    disabled={buttonIsDisabled}
                    titleStyle={styles.BUTTON_TITLE}
                  />
                  <Space size={spacing[2]} />
                </Card>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </Screen>
      </View>
    </Fragment>
  );
});
