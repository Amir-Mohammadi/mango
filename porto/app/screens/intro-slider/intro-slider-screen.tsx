import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image, Pressable, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components';
import AppIntroSlider from '../../components/slider/slider';
import { AppConfig } from '../../config';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { spacing } from '../../theme';

export const IntroSliderScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'introSlider'>
> = observer(props => {
  const { authStore } = useStores();

  const handelUserSawSlider = () => {
    authStore.setSliderVersion(AppConfig.slider.version);
    props.navigation.replace('login');
  };

  const slides = [
    {
      key: 1,
      title: 'اسلاید اول ',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
      image: require('../../assets/images/slider2.png'),
      backgroundColor: '#59b2ab',
      lottie1ViewStyle: {
        left: 112,
      },
      lottie1ViewSource: require('../../assets/animations/plants1.json'),
      lottie2ViewStyle: { flex: 1, left: -110, top: 50 },
      lottie2ViewSource: require('../../assets/animations/plants2.json'),
    },
    {
      key: 2,
      title: 'اسلاید دوم',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
      image: require('../../assets/images/slider1.png'),
      backgroundColor: '#febe29',
      lottie1ViewStyle: {
        top: -50,
      },
      lottie1ViewSource: require('../../assets/animations/clouds.json'),
    },
  ];

  const renderDoneButton = () => {
    return (
      <View
        style={{
          width: 80,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable>
          <Text
            style={{ fontSize: 16, color: 'white' }}
            onPress={handelUserSawSlider}>
            {'رد کردن'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient
          colors={['#5CBAF6', '#567AF7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
          }}>
          <SafeAreaView>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  height: '35%',
                  flexDirection: 'row',
                }}>
                <Image
                  source={item.image}
                  style={{ height: 285, width: 280 }}
                />
                <LottieView
                  style={item.lottie1ViewStyle}
                  source={item.lottie1ViewSource}
                  autoPlay={true}
                  loop={true}
                />
                {item.lottie2ViewSource ? (
                  <LottieView
                    style={item.lottie2ViewStyle}
                    source={item.lottie2ViewSource}
                    autoPlay={true}
                    loop={true}
                  />
                ) : null}
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                    marginTop: spacing[8] + spacing[8],
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginTop: spacing[4],

                    fontSize: 14,
                    textAlign: 'center',
                    marginHorizontal: spacing[8],
                  }}>
                  {item.text}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        renderDoneButton={renderDoneButton}
        showDoneButton={true}
        showNextButton={false}
        onDone={handelUserSawSlider}
        onSkip={handelUserSawSlider}
      />
    </View>
  );
});
