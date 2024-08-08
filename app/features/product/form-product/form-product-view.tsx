import {View, Pressable, StyleSheet, ScrollView} from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const FormProduct = ({
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  loadingState,
  product,
}: {
  onCreateProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  loadingState: LoadingState;
  product: Product;
}) => {
  const theme = useTheme();
  const [formProduct, setFormProduct] = useState<Product>(DefaultProduct);

  useEffect(() => {
    setFormProduct(product);
  }, [product]);

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

  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      <View id="form-product" style={{marginHorizontal: 20}}>
        {formProduct.id ? (
          <View style={style.infoForm}>
            <Text variant="bodyLarge" style={{color: 'dodgerblue'}}>
              For add new product first{' '}
            </Text>
            <Button
              mode="contained"
              onPress={() => setFormProduct(DefaultProduct)}>
              reset form
            </Button>
          </View>
        ) : null}

        <TextInput
          style={{marginVertical: 5}}
          label="Name"
          value={formProduct.name}
          onChangeText={name => handleNameChanges(name)}
        />
        <TextInput
          style={{marginVertical: 5}}
          label="Description"
          value={formProduct.description}
          onChangeText={description => handleDescriptionChanges(description)}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={{marginVertical: 5, minWidth: 150}}
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
                  style={{color: theme.colors.onPrimary, fontWeight: 'bold'}}
                  variant="headlineSmall">
                  {formProduct.currency}
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{color: theme.colors.onPrimary}}>
                  {' '}
                  Currency{'  '}
                </Text>
                {!visible ? (
                  <>
                    <FontAwesome5
                      color={theme.colors.onPrimary}
                      size={18}
                      name="caret-right"
                    />
                  </>
                ) : (
                  <>
                    <FontAwesome5
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            onPress={() => {}}
            style={{marginBottom: 5}}
            mode="contained"
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
            icon={() => (
              <>
                <FontAwesome5
                  name="trash"
                  size={20}
                  color={theme.colors.onError}
                />
              </>
            )}>
            Delete
          </Button>
          <Button
            style={{marginBottom: 5, width: 106.7}}
            mode="contained"
            icon={() => (
              <>
                <FontAwesome5
                  name="save"
                  size={20}
                  color={theme.colors.onPrimary}
                />
              </>
            )}
            onPress={() => {
              if (!formProduct.id) {
                onCreateProduct(formProduct);
              }
              if (formProduct.id) {
                onUpdateProduct(formProduct);
              }
            }}>
            Save
          </Button>
        </View>
      </View>
    </ScrollView>
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
  infoForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
