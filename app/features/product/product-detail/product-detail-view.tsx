import {View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {Product, ViewMode} from '../../../../models/models';
import {ImagesPreview} from '../../../components/images-preview';

export const ProductDetail = ({
  product,
  viewMode,
}: {
  product: Product;
  viewMode: ViewMode;
}) => {
  return (
    <View>
      <Card>
        <Card.Title titleVariant="headlineMedium" title={product.name} />
        <Card.Content>
          <Text variant="bodyLarge">{product.description}</Text>
          <View style={{marginVertical: 10}}>
            <ImagesPreview viewMode={viewMode} imagesNode={product.images} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
