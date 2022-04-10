import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    ImageBackground,

    StatusBar,
    Text,

    View
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { styles } from './delete-account-screen.style';

export const DeleteAccountScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'deleteAccount'>
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
            <SafeAreaView style={{ flex: 1 }}>
              <HeaderBackLogoMenu />

              <Card containerStyle={styles.CARD_CONTAINER}>
                <Card.Title style={styles.CARD_TITLE}>
                  {'حذف حساب کاربری'}
                </Card.Title>
                <Card.Divider
                  color="#F85757"
                  inset={true}
                  insetType="middle"
                  style={styles.CARD_DIVIDER}
                  width={2}
                />
                <ScrollView scrollEnabled={true} style={{ height: '75%' }}>
                  <Text style={styles.TEXT}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد. لورم ایپسوم متن ساختگی با تولید سادگی
                    نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                    لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                    متنوع با هدف بهبود ابزارهای کاربردی می باشد. لورم ایپسوم متن
                    ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                    طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
                    ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                    نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                    باشد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                    چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
                    روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط
                    فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
                    ابزارهای کاربردی می باشد.
                  </Text>
                </ScrollView>
                <Button
                  loading={!!authStore.isLoading}
                  buttonStyle={styles.BUTTON}
                  containerStyle={styles.BUTTON_CONTAINER}
                  style={{ backgroundColor: 'red' }}
                  title="تایید نهایی حذف حساب کاربری"
                  titleStyle={styles.BUTTON_TITLE}
                />
              </Card>
            </SafeAreaView>
          </ImageBackground>
        </Screen>
      </SafeAreaProvider>
    </View>
  );
});
