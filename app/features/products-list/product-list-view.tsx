import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {ProductList} from '../../../models/models';
import PagerView from 'react-native-pager-view';

export const ProductsList = ({
  currentPage,
  productList,
  handleNextPage
}: {
  currentPage: number;
  productList: ProductList;
  handleNextPage:() => void 
}) => {
    const products =  Object.values(productList)
  return (
    <View>
      <PagerView
        id="main-product-list"
        useNext
        initialPage={currentPage}
        onPageSelected={event => {
          const currentPosition = event.nativeEvent.position;
          console.log('position: ', currentPosition)
          if(currentPosition === products.length -1){
            handleNextPage()
          }
        }}>
            {products.map((product, index)=> (<View key={index}><Text>{product.name}</Text></View>) )}
        </PagerView>
    </View>
  );
};
