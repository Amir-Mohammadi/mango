import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { goBack, NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { styles } from './terms-of-service-screen.style';

export const TermsOfServiceScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'termsOfService'>
> = observer(() => {
  const { authStore } = useStores();

  return (
    <View style={styles.CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaProvider>
        <Screen style={styles.CONTAINER} variant="scrollView">
          <ImageBackground
            source={require('../../assets/images/Background.png')}
            resizeMode="cover"
            style={styles.IMAGE_BACKGROUND}>
            <View style={styles.LOGO_CONTAINER}>
              <Image
                style={styles.LOGO}
                source={require('../../assets/images/Elehome.png')}
                resizeMode="contain"
              />
            </View>
            <Card containerStyle={styles.CARD_CONTAINER}>
              <Card.Title style={styles.CARD_TITLE}>شرایط و مقررات</Card.Title>
              <Card.Divider
                color="#5782F8"
                inset={true}
                insetType="middle"
                style={styles.CARD_DIVIDER}
                width={2}
              />
              <Text style={styles.TEXT}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </Text>
              <Button
                loading={!!authStore.isLoading}
                ViewComponent={LinearGradient}
                buttonStyle={styles.BUTTON}
                onPress={() => {
                  goBack();
                }}
                containerStyle={styles.BUTTON_CONTAINER}
                linearGradientProps={{
                  colors: ['#5EBCFD', '#567CF8'],
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 0 },
                }}
                title="بازگشت"
                titleStyle={styles.BUTTON_TITLE}
              />
            </Card>
          </ImageBackground>
        </Screen>
      </SafeAreaProvider>
    </View>
  );
});
