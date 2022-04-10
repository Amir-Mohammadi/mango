import {
  Box,
  Button,

  Center, CSSObject,

  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  NumberInput,
  NumberInputField,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import {
  useAuthenticateMutation,
  useRegisterMutation,
  useVerifyAuthenticateMutation
} from '../../service/api/auth/auth-api';
import { TokenType } from '../../service/types';



export enum Steps {
  Login = 0,
  Verify = 1,
  Register = 2,
}

let otpInputConfigs = {
  numInputs: 5,
  separator: '',
  isDisabled: false,
  hasErrored: false,
  isInputNum: true,
  isInputSecure: false,
  minLength: 0,
  maxLength: 40,
  placeholder: '',
};

const EXPIRATION_TIME = 120;

export const LoginComponent: React.FC = () => {
  const [inputPhone, setInputPhone] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');

  const handleInputPhoneChange = (e) => setInputPhone(e.target.value);
  const handleInputNameChange = (e) => setInputName(e.target.value);
  const handleInputLastNameChange = (e) => setInputLastName(e.target.value);

  const checkButtonStatus = (secondExpired: boolean, length: number) => {
    if (secondExpired === true || length < otpInputConfigs.numInputs)
      return true;
  };

  const [step, setStep] = useState<Steps>(Steps.Login);

  const [authenticate] = useAuthenticateMutation();
  const [verifyAuthenticate] = useVerifyAuthenticateMutation();
  const [registerAuthenticate] = useRegisterMutation();

  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');

  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [seconds, setSeconds] = useState(EXPIRATION_TIME);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(myInterval);
        setIsCodeExpired(true);
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const loginButtonHandler = async () => {
    setSeconds(EXPIRATION_TIME);
    try {
      const authResult = await authenticate({
        Phone: inputPhone,
      }).unwrap();
      setToken(authResult.token);

      if (authResult.tokenType === TokenType.Verify) setStep(Steps.Verify);
      else if (authResult.tokenType === TokenType.Register)
        setStep(Steps.Register);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyButtonHandler = async () => {
    const verifyResult = await verifyAuthenticate({
      VerificationCode: otp,
      VerificationToken: token,
    }).unwrap();

    if (verifyResult.tokenType === TokenType.Register) setStep(Steps.Register);
  };

  const registerButtonHandler = async () => {
    const register = await registerAuthenticate({
      FirstName: inputName,
      LastName: inputLastName,
    }).unwrap();

    //TODo - navigate to dashboard page
  };

  if (step === Steps.Login) {
    return (
      <Flex sx={CONTAINER}>
        <Center>
          <Flex sx={FLEX}>
            <Flex sx={FLEX_2}>
              <Box>
                <FormControl>
                  <Center>
                    <Image
                      objectFit={'contain'}
                      src={'/elehome-icon.png'}
                      alt="Elehome"
                      height={66}
                      width={224}
                    />
                  </Center>
                  <FormLabel
                    fontSize={33}
                    textAlign={'center'}
                    mt={'3vh'}
                    mb={0}
                  >
                    ورود / عضویت
                  </FormLabel>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <Center>
                    <NumberInput>
                      <NumberInputField
                        id="phoneInput"
                        value={inputPhone}
                        onChange={handleInputPhoneChange}
                        h={68}
                        placeholder="0 9 1 4 6 4 0 2 8 7 6"
                        textAlign={'center'}
                        borderRadius={20}
                        bg={'#00000031'}
                        fontSize={20}
                        color={'white'}
                        maxLength={11}
                        // inputMode={'tel'}
                        // pattern="(-)?[0-9]*(.[0-9]+)?"
                        // pattern="[-+]?[0-9]*[.,]?[0-9]+"
                      />
                    </NumberInput>
                  </Center>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <Center>
                    <Button
                      h={'55px'}
                      color={'white'}
                      bgColor={'#5CA2FC'}
                      borderRadius={20}
                      fontSize={23}
                      flex={1}
                      onClick={loginButtonHandler}
                      disabled={inputPhone.length < 11}
                    >
                      ورود
                    </Button>
                  </Center>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <Center>
                    <Link>خطا در ورود به پانل کاربری؟</Link>
                  </Center>
                </FormControl>
              </Box>
            </Flex>
          </Flex>
        </Center>
        <Image
          src={'/Elevia-Login.svg'}
          objectFit={'contain'}
          mt={'10vh'}
          h={'67'}
          w={'100%'}
        />
      </Flex>
    );
  } else if (step === Steps.Verify) {
    return (
      <Flex sx={CONTAINER}>
        <Flex sx={FLEX}>
          <Flex sx={FLEX_2}>
            <Box>
              <FormControl>
                <Center>
                  <Image
                    objectFit={'contain'}
                    src={'/elehome-icon.png'}
                    alt="Elehome"
                    height={66}
                    width={224}
                  />
                </Center>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Center dir="rtl">
                  <Text>کد پیامک شده به</Text>
                  <Text
                    color={'#5CA2FC'}
                    as="ins"
                    paddingLeft={1}
                    paddingRight={1}
                  >
                    {inputPhone}
                  </Text>
                  <Text>وارد نمایید</Text>
                </Center>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Center>
                  <Link bgColor={'#00000031'} padding={2} borderRadius={10}>
                    اصلاح شماره موبایل
                  </Link>
                </Center>
              </FormControl>
            </Box>
            <Center>
              <OtpInput
                inputStyle={{
                  color: 'white',
                  width: '60px',
                  height: '65px',
                  fontSize: 40,
                  backgroundColor: '#00000031',
                  borderRadius: 5,
                  marginRight: 7,
                  marginLeft: 7,
                  borderColor: '#5EB4FC',
                  borderWidth: 1,
                }}
                numInputs={otpInputConfigs.numInputs}
                isDisabled={otpInputConfigs.isDisabled}
                hasErrored={otpInputConfigs.hasErrored}
                errorStyle="error"
                onChange={handleOtpChange}
                separator={<span>{otpInputConfigs.separator}</span>}
                isInputNum={otpInputConfigs.isInputNum}
                isInputSecure={otpInputConfigs.isInputSecure}
                shouldAutoFocus
                value={otp}
                placeholder={otpInputConfigs.placeholder}
              />
            </Center>
            <Box>
              <FormControl>
                <Center>
                  {seconds > 0 ? (
                    <Text>{`امکان ارسال مجدد در ${seconds} ثانیه`}</Text>
                  ) : (
                    <Link
                      onClick={() => {
                        setOtp('');
                        loginButtonHandler();
                        setSeconds(EXPIRATION_TIME);
                        setIsCodeExpired(false);
                      }}
                    >
                      ارسال مجدد
                    </Link>
                  )}
                </Center>
              </FormControl>
            </Box>
            <Box alignSelf={'center'}>
              <FormControl>
                <Button
                  width={'357px'}
                  height={'55px'}
                  color={'white'}
                  bgColor={'#5CA2FC'}
                  borderRadius={20}
                  fontSize={23}
                  onClick={verifyButtonHandler}
                  disabled={checkButtonStatus(isCodeExpired, otp.length)}
                >
                  ادامه
                </Button>
              </FormControl>
            </Box>
          </Flex>
        </Flex>
        <Box alignSelf={'center'}>
          <Image src={'/Elevia-Login.svg'} objectFit={'contain'} mt={'10vh'} />
        </Box>
      </Flex>
    );
  } else {
    return (
      <Flex sx={CONTAINER}>
        <Flex sx={FLEX}>
          <Flex sx={FLEX_2}>
            <Box>
              <FormControl>
                <Center>
                  <Image
                    objectFit={'contain'}
                    src={'/elehome-icon.png'}
                    alt="Elehome"
                    height={66}
                    width={224}
                  />
                </Center>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Center>
                  <Input
                    id="inputName"
                    value={inputName}
                    onChange={handleInputNameChange}
                    h={68}
                    placeholder="نام"
                    textAlign={'center'}
                    borderRadius={20}
                    bg={'#00000031'}
                    fontSize={20}
                    color={'white'}
                  />
                </Center>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Center>
                  <Input
                    id="inputLastName"
                    value={inputLastName}
                    onChange={handleInputLastNameChange}
                    h={68}
                    placeholder="نام خانوادگی"
                    textAlign={'center'}
                    borderRadius={20}
                    bg={'#00000031'}
                    fontSize={20}
                    color={'white'}
                  />
                </Center>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Center>
                  <Button
                    h={'55px'}
                    color={'white'}
                    bgColor={'#5CA2FC'}
                    borderRadius={20}
                    fontSize={23}
                    flex={1}
                    onClick={registerButtonHandler}
                    // disabled={inputName.length < 3 && inputLastName.length < 3}
                  >
                    ثبت نام
                  </Button>
                </Center>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <Center>
                  <Text>ادامه، به منزله پذیرش شرایط و مقررات می باشد</Text>
                </Center>
              </FormControl>
            </Box>
          </Flex>
        </Flex>
        <Image
          src={'/Elevia-Login.svg'}
          objectFit={'contain'}
          mt={'10vh'}
          h={'67'}
          w={'100%'}
        />
      </Flex>
    );
  }
};

const CONTAINER: CSSObject = {
  flexDir: 'column',
  p: 10,
  flex: 1,
  alignItems: 'flex-start',
};

const FLEX: CSSObject = {
  boxShadow: 'dark-lg',
  flexDir: 'column',
  py: '4vh',
  px: '3vw',
  rounded: 'md',
  bgColor: 'rgba(53, 82, 145, 0.67)',
  flex: 1,
  borderRadius: 50,
  minW: '500px',
  minH: '500px',
};

const FLEX_2: CSSObject = {
  direction: 'ltr',
  flexDir: 'column',
  columns: 2,
  columnGap: 3,
  rowGap: 6,
  flex: 1,
  padding: '5%',
  minH: '370px',
};
