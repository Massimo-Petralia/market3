import {View} from 'react-native';
import {Text, TextInput, Button, useTheme} from 'react-native-paper';
import {Address, User} from '../../../../models/models';
import {useState, useEffect} from 'react';
import {DefaultAddress} from '../../../../models/default-values';

export const FormUserAddress = ({
  address,
  onPatchAddress,
}: {
  address: Address;
  onPatchAddress: (address: Partial<User>) => void;
}) => {
  const theme = useTheme();
  const [formValue, setFormValue] = useState<Address>(DefaultAddress);
  const updateFormAddress = (key: keyof Address, value: string) => {
    setFormValue(previousValue => ({...previousValue, [key]: value}));
  };
  const handleAddressChanges = (address: string) => {
    updateFormAddress('address', address);
  };
  const handleCityChanges = (city: string) => {
    updateFormAddress('city', city);
  };

  const handleStateChanges = (state: string) => {
    updateFormAddress('state', state);
  };
  const handleCountryChanges = (country: string) => {
    updateFormAddress('country', country);
  };
  const handleZipcodeChanges = (zipcode: string) => {
    updateFormAddress('zipcode', zipcode);
  };
  useEffect(() => {
    if (address) {
      setFormValue(address);
    }
  }, [address]);
  return (
    <View style={{marginHorizontal: 20, marginVertical: 20}}>
      <View id="form-address">
        <Text>Address:</Text>
        <TextInput
          value={formValue.address}
          onChangeText={address => handleAddressChanges(address)}
          placeholder="Address"
        />
        <Text>City:</Text>
        <TextInput
          value={formValue.city}
          onChangeText={city => handleCityChanges(city)}
          placeholder="City"
        />
        <Text>State:</Text>
        <TextInput
          value={formValue.state}
          onChangeText={state => handleStateChanges(state)}
          placeholder="State"
        />
        <Text>Country:</Text>
        <TextInput
          value={formValue.country}
          onChangeText={country => handleCountryChanges(country)}
          placeholder="Country"
        />
        <Text>Zip code:</Text>
        <TextInput
          value={formValue.zipcode}
          onChangeText={zipcode => handleZipcodeChanges(zipcode)}
          placeholder="Zipcode"
        />
        <Button
          style={{marginVertical: 20}}
          mode="contained"
          onPress={() => onPatchAddress(formValue as unknown as Partial<User>)}>
          Save
        </Button>
      </View>
    </View>
  );
};
