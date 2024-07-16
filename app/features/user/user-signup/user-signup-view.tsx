import {Text, useTheme, TextInput, Button, Avatar} from 'react-native-paper';
import {ActivityIndicator, View, StyleSheet, Pressable} from 'react-native';
import {User} from '../../../../models/models';
import {DefaultUser} from '../../../../models/default-values';
import React, {useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import Routes from '../../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {pick, types} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const UserSignup = ({
  onSignup,
  isLoading,
  isSuccess,
  error,
}: {
  onSignup: (user: User) => void;

  isLoading: boolean;
  isSuccess: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [formValue, setFormValue] = useState<User>(DefaultUser);
  const defaultAvatar = require('../../../assets/images/user.png');
  const updateFormValue = (key: keyof User, value: string | object) => {
    setFormValue(previousValue => ({...previousValue, [key]: value}));
  };

  const handleNameChanges = (name: string) => {
    updateFormValue('name', name);
  };
  const handleEmailChanges = (email: string) => {
    updateFormValue('email', email);
  };
  const handlePasswordChanges = (password: string) => {
    updateFormValue('password', password);
  };

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

  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    console.error('Error: ', error);
  }
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
          onPress={() =>
            onSignup({
              ...formValue,
              name:
                formValue.name.charAt(0).toUpperCase() +
                formValue.name.slice(1),
            })
          }
          mode="contained">
          Signup
        </Button>
      </View>

      {isSuccess ? (
        <View style={style.notificationArea}>
          <Text variant="bodyMedium" style={{color: style.infoText.color}}>
            Registration was successful !
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
          onPress={() =>
            navigation.navigate(Routes.tab.user.index, {
              screen: Routes.tab.user.signin,
            })
          }>
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
