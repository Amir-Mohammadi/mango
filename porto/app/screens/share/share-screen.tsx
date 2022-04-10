import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, {
    Fragment,
    useCallback,
    useEffect,
    useReducer,
    useState
} from 'react';
import { Share, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Header, Screen } from '../../components';
import {
    ValidationInput,
    ValidationType
} from '../../components/validation-input/validation-input';
import { goBack, NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { color, namedSpacing } from '../../theme';
import { styles } from './share-screen.style';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state: State, action: Action): State => {
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
export const ShareScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'shareScreen'>
> = observer(props => {
  const { assetStore, dialogStore } = useStores();

  const { assetId } = props.route.params;

  const [formValidationDisplay, setFormValidationDisplay] =
    useState<boolean>(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    values: {
      phoneNumber: '',
    },
    validates: {
      phoneNumber: { isValid: false, validationMessage: '' },
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (
      inputIdentifier: string,
      inputValue: string,
      inputValidity: boolean,
      validationMessage: string,
    ) => {
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
  useEffect(() => {
    assetStore.getAssets();
  }, []);

  const onShare = async () => {
    if (!formState.formIsValid) {
      setFormValidationDisplay(true);
    } else {
      try {
        const shareResult = await assetStore.assetShare(
          assetId,
          formState.values.phoneNumber,
        );

        if (shareResult.kind === 'ok') {
          await Share.share({
            message: shareResult.data.sharingToken,
          });
          props.navigation.navigate('home');
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };
  const validationMessage = (input: any): string => {
    return !input.isValid && formValidationDisplay && input.validationMessage;
  };
  const inputTokenHandler = async () => {
    dialogStore.showInputDialog({
      title: 'Input token',
      validationType: [ValidationType.required],
      inputPlaceHolder: 'Received Token',
      onSubmit: async inputValue => {
        const res = await assetStore.assetShareVerify(inputValue);
        if (res.kind === 'ok') {
          props.navigation.navigate('home');
        }
      },
    });
  };

  return (
    <Fragment>
      <Header
        headerText="Sharing"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="fixed">
        <View style={styles.PHONE_NUMBER_CONTAINER}>
          <ValidationInput
            identifier="phoneNumber"
            placeholder={'09*******'}
            keyboardType={'phone-pad'}
            onInputChange={inputChangeHandler}
            validationTypes={[ValidationType.required, ValidationType.phone]}
            errorMessage={validationMessage(formState.validates.phoneNumber)}
            errorStyle={styles.ERROR_TEXT}
            leftIcon={
              <Icon
                name={'mobile1'}
                type={'ant-design'}
                size={24}
                color={color.palette.lightGrey}
              />
            }></ValidationInput>
        </View>
        <View style={styles.BUTTON_CONTAINER}>
          <View style={styles.BUTTON}>
            <Button
              type="solid"
              onPress={onShare}
              title={'Send Your Asset ID'}></Button>
          </View>
          <View style={styles.BUTTON}>
            <Button
              type="solid"
              onPress={inputTokenHandler}
              title={'I have a token'}></Button>
          </View>
        </View>
      </Screen>
    </Fragment>
  );
});

export const ShareScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Share Asset',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        onPress={() => {
          goBack();
        }}
        name="arrowleft"
        type="ant-design"
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};

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
