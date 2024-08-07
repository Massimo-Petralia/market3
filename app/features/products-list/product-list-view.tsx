import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {Text, Card, Divider, ActivityIndicator} from 'react-native-paper';
import {LoadingState, Product} from '../../../models/models';
import {useEffect, useRef} from 'react';
import {FilteredSearch} from '../../components/filtered-search';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/routes';
import {HomeStackNavigationProp} from '../../navigation/navigation-types';

export const ProductsList = ({
  products,
  onFilteredSearch,
  filteredProducts,
  loadingState,
}: {
  products: Product[];
  onFilteredSearch: (name: string) => void;
  filteredProducts: Product[];
  loadingState: LoadingState;
}) => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const flatListRef = useRef<FlatList<Product>>(null);
  const {width} = Dimensions.get('window');

  useEffect(() => {}, []);
  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <FilteredSearch
        loadingState={loadingState}
        onFilteredSearch={onFilteredSearch}
      />
      <ScrollView>
        {filteredProducts.length !== 0 ? (
          <>
            <FlatList
              style={{marginBottom: 5}}
              data={filteredProducts}
              pagingEnabled
              snapToInterval={width}
              decelerationRate={'fast'}
              horizontal
              renderItem={({item}) => (
                <Pressable
                onPress={() => {
                  if (item.id) {
                    navigation.navigate('Product detail', {productId: item.id, isProductDetail: true});
                  }
                }}>
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
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        ) : null}
        <FlatList
          ref={flatListRef}
          data={products}
          pagingEnabled
          snapToInterval={width}
          decelerationRate={'fast'}
          horizontal
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                if (item.id) {
                  navigation.navigate('Product detail', {productId: item.id, isProductDetail: true});
                }
              }}>
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
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </>
  );
};
