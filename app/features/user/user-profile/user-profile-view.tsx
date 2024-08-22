import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {User} from '../../../models/models';
import {
  Button,
  Card,
  useTheme,
  List,
  Text,
  Divider,
  Portal,
  FAB,
} from 'react-native-paper';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Routes from '../../../navigation/routes';
import {MainTabsNavigationProp, RootStackNavigationProp, UserStackNavigationProp} from '../../../navigation/navigation-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';

export const UserProfile = ({
  onLogout,
  userDetail,
}: {
  onLogout: () => void;
  userDetail: User;
}) => {
  const [fabGroup, setFabGroup] = useState({open: false});
  const [isVisible, setMainFabVisibility] = useState<boolean>(true);
  const navigation = useNavigation<RootStackNavigationProp>();
  const theme = useTheme();
  const defaultAvatar = require('../../../assets/images/user.png');
  const closeFabGroup = () => {
    setFabGroup({open: false});
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setMainFabVisibility(false);
    });
    return unsubscribe;
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      setMainFabVisibility(true);
    }, []),
  );
  return (
    <View>
      <ScrollView style={{marginHorizontal: 20}}>
        <View id="user-detail">
          <Card style={{marginVertical: 5}}>
            <Pressable>
              <Card.Cover
                style={[style.pressable, {borderColor: theme.colors.primary}]}
                source={
                  !userDetail.avatar.uri
                    ? defaultAvatar
                    : {uri: userDetail.avatar.uri}
                }
              />
            </Pressable>
            <Divider horizontalInset />
            <Card.Title
              title="Profile details"
              titleStyle={{paddingLeft: 16}}
            />
            <Card.Content>
              <List.Item
                contentStyle={style.listItem}
                title="Name: "
                description={userDetail.name}
              />
              <List.Item
                contentStyle={style.listItem}
                title="E-mail: "
                description={userDetail.email}
              />
            </Card.Content>
            <Divider horizontalInset />

            <Card.Title title="Address" titleStyle={{paddingLeft: 16}} />

            {userDetail.address.address ? (
              <Card.Content>
                <List.Item
                  style={style.listItem}
                  title="Address: "
                  description={userDetail.address.address}
                />
                <List.Item
                  style={style.listItem}
                  title="City: "
                  description={userDetail.address.city}
                />
                <List.Item
                  style={style.listItem}
                  title="State: "
                  description={userDetail.address.state}
                />
                <List.Item
                  style={style.listItem}
                  title="Country: "
                  description={userDetail.address.country}
                />
                <List.Item
                  style={style.listItem}
                  title="Zip code: "
                  description={userDetail.address.zipcode}
                />
              </Card.Content>
            ) : null}
          </Card>
        </View>
      </ScrollView>
      <Portal>
        <FAB.Group
          style={{marginBottom: 80}}
          open={fabGroup.open}
          visible={isVisible}
          icon={!fabGroup.open ? 'menu' : 'menu-open'}
          onStateChange={({open}) => setFabGroup({open})}
          actions={[
            {
              icon: 'logout',
              onPress: () => onLogout(),
            },
            {
              icon: 'cart',
              label: 'My cart',
              onPress:(() => {
                closeFabGroup();
                navigation.navigate('MainTabs', {screen: 'Cart'});
              })
            },
            {
              icon: 'pencil-box',
              label: 'Address',
              onPress: () => {
                closeFabGroup();
                navigation.navigate('MainTabs', {screen: 'User', params:{screen:'Address'}});
              },
            },
            {
              icon: 'view-list',
              label: 'My products',
              onPress: () => {
                closeFabGroup();
                navigation.navigate('MainTabs', {screen: 'User', params:{screen:'My products'}});
              },
            },
          ]}
        />
      </Portal>
    </View>
  );
};

const style = StyleSheet.create({
  pressable: {
    borderRadius: 50,
    borderWidth: 2,
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginVertical: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
