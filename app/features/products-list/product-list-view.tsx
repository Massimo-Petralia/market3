import {View, FlatList, Dimensions, Image} from 'react-native';
import {Text, Card, Divider, ActivityIndicator} from 'react-native-paper';
import {LoadingState, Product} from '../../../models/models';
import {useEffect, useRef} from 'react';
import {FilteredSearch} from '../../components/filtered-search';

export const ProductsList = ({
  products,
  onFilteredSearch,
  filteredProducts,
  loadingState,
}: {
  products: Product[];
  onFilteredSearch:(name: string)=>void
  filteredProducts: Product[];
  loadingState: LoadingState;
}) => {
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
    <View>
      <FilteredSearch
        productList={filteredProducts}
        loadingState={loadingState}
        onFilteredSearch={onFilteredSearch}
      />
      <FlatList
        ref={flatListRef}
        data={products}
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
    </View>
  );
};
