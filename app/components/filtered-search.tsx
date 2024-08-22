import {LoadingState} from '../models/models';
import {View, Pressable, StyleSheet, Dimensions} from 'react-native';
import {ActivityIndicator, Text, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const FilteredSearch = ({
  onFilteredSearch,

  loadingState,
}: {
  onFilteredSearch: (name: string) => void;

  loadingState: LoadingState;
}) => {
  const theme = useTheme();
  const {width} = Dimensions.get('window');
  const [text, setText] = useState<string>('');

  return (
    <View>
      <View
        id="filtered-search-field"
        style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TextInput
          dense
          outlineStyle={{
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderColor: theme.colors.primary,
          }}
          style={{flexGrow: 1}}
          mode="outlined"
          placeholder="search products..."
          value={text}
          onChangeText={text => setText(text)}
        />
        <Pressable
          style={[
            style.searchPressable,
            {backgroundColor: theme.colors.primary},
          ]}
          onPress={() => onFilteredSearch(text)}>
          <FontAwesome name="search" color={theme.colors.onPrimary} size={16} />
          <Text style={{color: theme.colors.onPrimary}}> Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  searchPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    flexGrow: 1,
    justifyContent: 'center',
  },
});
