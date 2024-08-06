import {View, FlatList, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {Product, ProductList} from '../../../models/models';
import {useState, useEffect, useRef} from 'react';

export const ProductsList = ({
  currentPage,
  productList,
  onLastElement,
  onNextPage,
  isLastElement,
}: {
  currentPage: number;
  productList: ProductList;
  onLastElement: () => void;
  onNextPage: () => void;
  isLastElement: boolean;
}) => {
  const flatListRef = useRef<FlatList<Product>>(null);
  const {width} = Dimensions.get('window');
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(Object.values(productList));
    if (Object.values(productList).length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 0, animated: true });
      }, 100);
    }
  }, [productList]);
  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={products}
        pagingEnabled
        snapToInterval={width}
        decelerationRate={'fast'}
        onEndReached={() => {
          onLastElement(), console.log('last element reached');
        }}
        // onViewableItemsChanged={()=>{
        //   if(isLastElement){
        //     onNextPage()
        //   }
        // }}
        renderItem={({item}) => (
          <Text style={{padding: 20, backgroundColor: 'dodgerblue', width}}>
            {item.name}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </View>
  );
};
