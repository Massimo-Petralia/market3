import {View} from 'react-native';
import {Text, Card, Divider} from 'react-native-paper';
import {Product} from '../../../../models/models';
import { ImagesPreview } from '../../../components/images-preview';

export const ProductDetail = ({product,  isProductDetail}: {product: Product, isProductDetail: boolean}) => {
  return (
    <View>
      <Card>
        <Card.Title title={product.name} />
        <Divider horizontalInset />
        <Card.Content>
            <Text>{product.description}</Text>
            <Divider horizontalInset />
          <ImagesPreview isProductDetail={isProductDetail} imagesNode={product.images}/>
        </Card.Content>
      </Card>
    </View>
  );
};
