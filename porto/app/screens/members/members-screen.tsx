import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Icon } from 'react-native-elements';
import { Header, Screen } from '../../components';
import { goBack, NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { styles } from './member-screen.style';

export const MembersScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'members'>
> = observer(props => {
  const { navigation } = props;
  const { userStore } = useStores();

  return (
    <Fragment>
      <Header
        headerText="Members"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="scroll">
        {/* {
        userStore.getMembers.map((member, index) => (
          // eslint-disable-next-line react/jsx-key
          <View style={styles.ASSETS}>
            <TouchableOpacity
                key = {index}
                onPress = {() => navigation.navigate('manageHome', {assetId: member.id})}>
                <Text>
                  {member.label + `${member.ownerId === userStore.id ? '' : ' (shared)'}`}
                </Text>
            </TouchableOpacity>
          </View>
        ))
      } */}
      </Screen>
    </Fragment>
  );
});

export const MembersScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Manage members',
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
