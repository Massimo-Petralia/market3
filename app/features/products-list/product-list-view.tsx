import {View, FlatList, Dimensions, Image} from 'react-native';
import {Text, Card, Divider} from 'react-native-paper';
import {Product} from '../../../models/models';
import {useEffect, useRef} from 'react';

export const ProductsList = ({products}: {products: Product[]}) => {
  const flatListRef = useRef<FlatList<Product>>(null);
  const {width} = Dimensions.get('window');

  useEffect(() => {}, []);
  return (
    <View>
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
              <Image style={{ height: 200}} resizeMode='contain' source={{uri: item.images[0]}} />
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
