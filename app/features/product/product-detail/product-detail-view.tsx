import {View} from 'react-native';
import {Text, Card, Divider} from 'react-native-paper';
import {Product} from '../../../../models/models';
import {ImagesPreview} from '../../../components/images-preview';

export const ProductDetail = ({
  product,
  isProductDetail,
}: {
  product: Product;
  isProductDetail: boolean;
}) => {
  return (
    <View>
      <Card>
        <Card.Title titleVariant='headlineMedium' title={product.name} />
        <Card.Content>
          <Text variant="bodyLarge">{product.description}</Text>
          <View style={{marginVertical: 10}}>
            <ImagesPreview
              isProductDetail={isProductDetail}
              imagesNode={product.images}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
