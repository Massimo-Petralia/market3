import {View, StyleSheet} from 'react-native';
import {Text, Button, TextInput, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../../navigation/routes';
import {AuthStackNavigationProp} from '../../../navigation/navigation-types';
import {useState} from 'react';
import {DefaultUser} from '../../../../models/default-values';
import {User} from '../../../../models/models';

export const UserSignin = ({
  onSignin,
  isLoading,
}: {
  onSignin: ({email, password}: {email: string; password: string}) => void;
  isLoading: boolean;
}) => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [formValue, setFormValue] = useState<User>(DefaultUser);
  const updateFormValue = (key: keyof User, value: string) => {
    setFormValue(previousValue => ({...previousValue, [key]: value}));
  };
  const handleEmailChanges = (email: string) => updateFormValue('email', email);
  const handlePasswordChanges = (password: string) =>
    updateFormValue('password', password);
  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <View>
      <View id="signin-form" style={{marginTop: 5}}>
        <TextInput
          style={style.textInput}
          label="E-mail"
          value={formValue.email}
          onChangeText={email => handleEmailChanges(email)}
        />
        <TextInput
          style={style.textInput}
          label="Password"
          value={formValue.password}
          onChangeText={password => handlePasswordChanges(password)}
        />
        <Button
          style={{alignSelf: 'center', marginTop: 10}}
          mode="contained"
          onPress={() =>
            onSignin({email: formValue.email, password: formValue.password})
          }>
          Signin
        </Button>
      </View>
      <View style={style.infoArea}>
        <Text style={{alignSelf: 'center'}}>If you are new</Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate(Routes.Auth.Signup)}>
          Go to Signup
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textInput: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  infoArea: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
