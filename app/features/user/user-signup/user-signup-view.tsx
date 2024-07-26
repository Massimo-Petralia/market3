import {Text, useTheme, TextInput, Button, Avatar} from 'react-native-paper';
import {ActivityIndicator, View, StyleSheet, Pressable} from 'react-native';
import {Notification, User} from '../../../../models/models';
import {DefaultUser} from '../../../../models/default-values';
import React, {useState} from 'react';
import Routes from '../../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {pick, types} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {AuthStackNavigationProp} from '../../../navigation/navigation-types';

export const UserSignup = ({
  onSignup,
  isVisible,
  notification,
}: {
  onSignup: (user: User) => void;
  isVisible: boolean;
  notification: Notification;
}) => {
  const theme = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [formValue, setFormValue] = useState<User>(DefaultUser);
  const defaultAvatar = require('../../../assets/images/user.png');
  const updateFormValue = (key: keyof User, value: string | object) => {
    setFormValue(previousValue => ({...previousValue, [key]: value}));
  };

  const handleNameChanges = (name: string) => updateFormValue('name', name);

  const handleEmailChanges = (email: string) => updateFormValue('email', email);

  const handlePasswordChanges = (password: string) =>
    updateFormValue('password', password);

  const handleAvatarChanges = React.useCallback(async () => {
    try {
      const response = await pick({
        type: [types.images],
      });
      const avatar = response[0];
      const base64URI = await RNFS.readFile(avatar.uri, 'base64');
      updateFormValue('avatar', {
        type: avatar.type,
        uri: `data:image/${avatar.type};base64, ${base64URI}`,
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  }, []);

  return (
    <View>
      <View id="signup-form" style={{marginTop: 5}}>
        <TextInput
          style={style.textInput}
          label="Name"
          onChangeText={name => handleNameChanges(name)}
        />
        <TextInput
          style={style.textInput}
          label="E-mail"
          onChangeText={email => handleEmailChanges(email)}
        />
        <TextInput
          style={style.textInput}
          label="Password"
          onChangeText={password => handlePasswordChanges(password)}
        />
        <View style={{alignItems: 'center'}}>
          <Pressable
            style={{
              marginVertical: 20,
              borderWidth: 2,
              borderRadius: 50,
              borderColor: theme.colors.primary,
            }}
            onPress={() => handleAvatarChanges()}>
            <Avatar.Image
              style={{backgroundColor: 'transparent'}}
              size={80}
              source={
                formValue.avatar.uri
                  ? {uri: formValue.avatar.uri}
                  : defaultAvatar
              }
            />
          </Pressable>
        </View>
        <Button
          style={{alignSelf: 'center'}}
          onPress={() => onSignup(formValue)}
          mode="contained">
          Signup
        </Button>
      </View>

      {isVisible ? (
        <View style={style.notificationArea}>
          <Text variant="bodyMedium" style={{color: style.infoText.color}}>
            {notification.text}
          </Text>
          <Text variant="bodyMedium" style={{color: style.infoText.color}}>
            you can sign in with your credentials
          </Text>
        </View>
      ) : null}

      <View style={style.infoArea}>
        <Text>If you are already registered</Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate(Routes.Auth.Signin)}>
          Go to Signin
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  infoText: {
    color: 'dodgerblue',
  },
  textInput: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  notificationArea: {
    marginVertical: 10,
    alignItems: 'center',
  },
  infoArea: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});
