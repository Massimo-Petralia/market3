import {View, StyleSheet, Pressable} from 'react-native';
import {User} from '../../../../models/models';
import {Text, Button, Avatar, Card, useTheme, List} from 'react-native-paper';
import {useState} from 'react';
import {DefaultUser} from '../../../../models/default-values';

export const UserProfile = ({
  onLogout,
  userDetail,
}: {
  onLogout: () => void;
  userDetail: User;
}) => {
  const theme = useTheme();
  const defaultAvatar = require('../../../assets/images/user.png');
  return (
    <View>
      <View id="user-detail">
        <Card>
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
          <Card.Title title="Profile details" titleStyle={{paddingLeft: 16}} />
          <Card.Content>
            <List.Item
              contentStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              title="Name: "
              description={userDetail.name}
            />
            <List.Item
              contentStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              title="E-mail: "
              description={userDetail.email}
            />
          </Card.Content>
          <Card.Actions>
            <Button
              style={{alignSelf: 'center'}}
              mode="contained"
              onPress={() => onLogout()}>
              Logout
            </Button>
          </Card.Actions>
        </Card>
      </View>
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
});
