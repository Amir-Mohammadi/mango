import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    Image,
    ImageBackground,
    Linking,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { Header } from '../../components/header2/header';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { spacing } from '../../theme';
import { styles } from './about-screen.style';

export const AboutScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'about'>
> = observer(props => {
  const { navigation } = props;
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
            <Header
              headerRightComponent={
                <View>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/menu.png')}
                      resizeMode="contain"
                      style={{
                        width: 24,
                        height: 27,
                        marginRight: spacing[2],
                        marginTop: spacing[8],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              }
              headerLeftComponent={
                <View>
                  <TouchableOpacity onPress={navigation.goBack}>
                    <Image
                      source={require('../../assets/images/back.png')}
                      resizeMode="contain"
                      style={{
                        width: 24,
                        height: 27,
                        marginLeft: spacing[2],
                        marginTop: spacing[8],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
            <View style={styles.LOGO_CONTAINER}>
              <Image
                style={styles.LOGO}
                source={require('../../assets/images/Elehome.png')}
                resizeMode="contain"></Image>
            </View>
            <Card containerStyle={styles.CARD_CONTAINER}>
              <Card.Title style={styles.CARD_TITLE}>
                {'درباره الویا'}
              </Card.Title>
              <Card.Divider
                color="#5782F8"
                inset={true}
                insetType="middle"
                style={styles.CARD_DIVIDER}
                width={2}
              />
              <ScrollView scrollEnabled={true}>
                <Text style={styles.TEXT}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                  از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                  بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                  شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
                  ابزارهای کاربردی می باشد.
                </Text>
              </ScrollView>
              <Button
                loading={!!authStore.isLoading}
                ViewComponent={LinearGradient}
                buttonStyle={styles.BUTTON}
                onPress={() => {
                  Linking.openURL('https://google.com');
                }}
                containerStyle={styles.BUTTON_CONTAINER}
                linearGradientProps={{
                  colors: ['#5EBCFD', '#567CF8'],
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 0 },
                }}
                title="مشاهده وب سایت"
                titleStyle={styles.BUTTON_TITLE}
              />
            </Card>
          </ImageBackground>
        </Screen>
      </SafeAreaProvider>
    </View>
  );
});
