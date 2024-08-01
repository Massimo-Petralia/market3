import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {User} from '../../../../models/models';
import {Button, Card, useTheme, List, Text, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../../navigation/routes';
import {UserStackNavigationProp} from '../../../navigation/navigation-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const UserProfile = ({
  onLogout,
  userDetail,
}: {
  onLogout: () => void;
  userDetail: User;
}) => {
  const navigation = useNavigation<UserStackNavigationProp>();
  const theme = useTheme();
  const defaultAvatar = require('../../../assets/images/user.png');
  return (
    <ScrollView>
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
          <Divider horizontalInset/>
          <Card.Title title="Profile details" titleStyle={{paddingLeft: 16}} />
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
          <Card.Actions>
            <Button
              style={{alignSelf: 'center' , marginRight: 16}}
              mode="contained"
              onPress={() => onLogout()}>
              Logout
            </Button>
          </Card.Actions>
        </Card>
        <Card style={{marginVertical: 5}}>
          <Card.Title
            title="Address"
            titleStyle={{paddingLeft: 16}}
            right={props => (
              <Button
                mode="contained"
              style={{marginRight: 23}}
                onPress={() =>
                  navigation.navigate(Routes.MainTabs.UserStack.Address)
                }>
                <FontAwesome size={20} name="edit" />
                {' '}Edit
              </Button>
            )}
          />

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
