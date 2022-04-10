import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header, Screen } from '../../components';
import { goBack, NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { styles } from './manage-homes-screen.style';
export const ManageHomesScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'manageHomes'>
> = observer(props => {
  const { navigation } = props;
  const { assetStore, userStore } = useStores();
  return (
    <Fragment>
      <Header
        headerText="Customization Homes"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="scroll">
        {assetStore.assetList.map((asset, index) => (
          // eslint-disable-next-line react/jsx-key
          <View style={styles.ASSETS}>
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('manageHome', { assetId: asset.id })
              }>
              <Text>
                {asset.label +
                  `${asset.ownerId === userStore.id ? '' : ' (shared)'}`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Screen>
    </Fragment>
  );
});

export const ManageHomesScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Manage homes',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        name="arrowleft"
        type="ant-design"
        onPress={() => {
          goBack();
        }}
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};
