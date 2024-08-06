import {View, Pressable, StyleSheet} from 'react-native';
import {
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Menu,
  useTheme,
} from 'react-native-paper';
import {Currency, LoadingState, Product} from '../../../../models/models';
import {useEffect, useState} from 'react';
import {DefaultProduct} from '../../../../models/default-values';
import {ImagesPreview} from '../../../components/images-preview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const FormProduct = ({
  onCreateProduct,
  onUpdateProduct,
  loadingState,
  product,
}: {
  onCreateProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  loadingState: LoadingState;
  product: Product;
}) => {
  const theme = useTheme();
  const [formProduct, setFormProduct] = useState<Product>(DefaultProduct);

  const updateFormProduct = (key: keyof Product, value: string | string[]) => {
    setFormProduct(previuosValue => ({...previuosValue, [key]: value}));
  };

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
      <View id="form-product" style={{marginHorizontal: 20}}>
        <Button
          style={{marginBottom: 5}}
          mode="contained"
          onPress={() => {
            if (!formProduct.id) {
              onCreateProduct(formProduct);
              setFormProduct(DefaultProduct);
            }
          }}>
          Save
        </Button>
        <TextInput
          style={{marginVertical: 10}}
          label="Name"
          value={formProduct.name}
          onChangeText={name => handleNameChanges(name)}
        />
        <TextInput
          style={{marginVertical: 10}}
          label="Description"
          value={formProduct.description}
          onChangeText={description => handleDescriptionChanges(description)}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={{marginVertical: 10, minWidth: 150}}
            label="Price"
            value={formProduct.price}
            onChangeText={price => handlePriceChanges(price)}
          />
          <Menu
            style={{borderRadius: 20}}
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            anchor={
              <Pressable
                style={[
                  style.currencyPressable,
                  {backgroundColor: theme.colors.primary},
                ]}
                onPress={() => openMenu()}>
                <Text
                  style={{color: theme.colors.onPrimary}}
                  variant="bodyLarge">
                  {formProduct.currency + ' Currency '}{' '}
                </Text>
                {!visible ? (
                  <>
                    <FontAwesome
                      color={theme.colors.onPrimary}
                      size={18}
                      name="caret-right"
                    />
                  </>
                ) : (
                  <>
                    <FontAwesome
                      color={theme.colors.onPrimary}
                      size={18}
                      name="caret-down"
                    />
                  </>
                )}
              </Pressable>
            }>
            <Menu.Item
              onPress={() => {
                handleCurrencyChanges('€');
                closeMenu();
              }}
              title="€ Euro"
            />
            <Menu.Item
              onPress={() => {
                handleCurrencyChanges('$');
                closeMenu();
              }}
              title="$ Dollar"
            />
          </Menu>
        </View>
        <ImagesPreview
          imagesNode={formProduct.images}
          handleImagesChanges={handleImagesChanges}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  currencyPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    width: 125,
  },
});
