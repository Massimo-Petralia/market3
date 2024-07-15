import {Text, useTheme, TextInput, Button} from 'react-native-paper';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {User} from '../../../../models/models';
import {DefaultUser} from '../../../../models/default-values';
import {useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import Routes from '../../../navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {pick, types} from 'react-native-document-picker';

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
  const updateFormValue = (key: keyof User, value: string) => {
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
      <View id="signup-form">
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
        <Button
          style={{alignSelf: 'center'}}
          onPress={() => onSignup(formValue)}
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
            navigation.navigate(Routes.root.main, {
              screen: Routes.root.tab.user.index,
              params: {screen: Routes.root.tab.user.signin},
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
    marginVertical: 10,
  },
  notificationArea: {
    marginVertical: 10,
    alignItems: 'center',
  },
  infoArea: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
