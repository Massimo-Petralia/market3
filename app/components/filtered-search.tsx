import {LoadingState, Product} from '../../models/models';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  ActivityIndicator,
  Text,
  TextInput,
  useTheme,
  Card,
  Divider,
} from 'react-native-paper';
import {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const FilteredSearch = ({
  onFilteredSearch,
  productList,
  loadingState,
}: {
  onFilteredSearch: (name: string) => void;
  productList: Product[];
  loadingState: LoadingState;
}) => {
  const theme = useTheme();
  const {width} = Dimensions.get('window');
  const [text, setText] = useState<string>('');

  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
          placeholder="insert text..."
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
      {productList.length !== 0 ? (
        <>
          <FlatList
            data={productList}
            pagingEnabled
            snapToInterval={width}
            decelerationRate={'fast'}
            horizontal
            renderItem={({item}) => (
              <Card style={{width}}>
                <Card.Title title={item.name} />
                <Divider horizontalInset style={{marginBottom: 10}} />
                <Card.Content>
                  <Image
                    style={{height: 200}}
                    resizeMode="contain"
                    source={{uri: item.images[0]}}
                  />
                </Card.Content>
              </Card>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      ) : null}
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
