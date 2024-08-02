import {View} from 'react-native';
import {Text, ActivityIndicator, TextInput, Button} from 'react-native-paper';
import {Currency, LoadingState, Product} from '../../../../models/models';
import {useEffect, useState} from 'react';
import {DefaultProduct} from '../../../../models/default-values';
import {ImagesPreview} from '../../../components/images-preview';

export const FormProduct = ({
  onCreateProduct,
  loadingState,
  product,
}: {
  onCreateProduct: (product: Product) => void;
  loadingState: LoadingState;
  product: Product;
}) => {
  const [formProduct, setFormProduct] = useState<Product>(DefaultProduct);

  const updateFormProduct = (key: keyof Product, value: string | string[]) => {
    setFormProduct(previuosValue => ({...previuosValue, [key]: value}));
  };

  const handleNameChanges = (name: string) => {
    updateFormProduct('name', name);
  };
  const handleDescriptionChanges = (description: string) => {
    updateFormProduct('description', description);
  };
  const handlePriceChanges = (price: string) => {
    updateFormProduct('price', price);
  };
  const handleCurrencyChanges = (currency: Currency) => {
    updateFormProduct('currency', currency);
  };

  const handleImagesChanges = (images: string[]) => {
    updateFormProduct('images', images);
  };

  useEffect(() => {
    setFormProduct(product);
  }, [product]);

  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      <View id="form-product">
        <Text>Form product work !</Text>
        <ImagesPreview handleImagesChanges={handleImagesChanges} />
        <Button
          style={{marginHorizontal: 20}}
          mode="contained"
          onPress={() => onCreateProduct(formProduct)}>
          Save
        </Button>
      </View>
    </View>
  );
};
