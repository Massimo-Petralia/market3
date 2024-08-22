import {View} from 'react-native';
import {Text, Card, Button, useTheme} from 'react-native-paper';
import {Product, ViewMode} from '../../../models/models';
import {ImagesPreview} from '../../../components/images-preview';

export const ProductDetail = ({
  product,
  viewMode,
  navigationFromCart,
  onAddToCart,
}: {
  product: Product;
  viewMode: ViewMode;
  navigationFromCart: boolean | undefined;
  onAddToCart: () => void;
}) => {
  const theme = useTheme();
  return (
    <View style={{marginHorizontal: 20, marginVertical: 10}}>
      <Card>
        <Card.Title titleVariant="headlineMedium" title={product.name || ''} />
        <Card.Content>
          <Text variant="bodyLarge">{product.description}</Text>
          <View style={{marginVertical: 10}}>
            <ImagesPreview viewMode={viewMode} imagesNode={product.images} />
          </View>
          <Text
            variant="displaySmall"
            style={{
              alignSelf: 'center',
            }}>{`${product.price} ${product.currency}`}</Text>
        </Card.Content>
      </Card>
      {!navigationFromCart ? (
        <Button
          style={{marginVertical: 10}}
          mode="contained"
          onPress={() => {
            onAddToCart();
          }}>
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Add to cart
          </Text>
        </Button>
      ) : null}
    </View>
  );
};
