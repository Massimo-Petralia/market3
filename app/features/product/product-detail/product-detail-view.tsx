import {View} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import {Product, ViewMode} from '../../../../models/models';
import {ImagesPreview} from '../../../components/images-preview';

export const ProductDetail = ({
  product,
  viewMode,
  onAddToCart,
}: {
  product: Product;
  viewMode: ViewMode;
  onAddToCart: () => void;
}) => {
  return (
    <View>
      <Card>
        <Card.Title titleVariant="headlineMedium" title={product.name || ''} />
        <Card.Content>
          <Text variant="bodyLarge">{product.description}</Text>
          <View style={{marginVertical: 10}}>
            <ImagesPreview viewMode={viewMode} imagesNode={product.images} />
          </View>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => {
          onAddToCart();
        }}>
        Add to cart
      </Button>
    </View>
  );
};
