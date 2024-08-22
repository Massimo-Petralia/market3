import {View, ScrollView, Pressable, Image} from 'react-native';
import {
  Text,
  Card,
  Divider,
  IconButton,
  useTheme,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import {LoadingState, Product} from '../../models/models';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigation/navigation-types';
import {useEffect, useState} from 'react';

export const Cart = ({
  cart,
  onRemoveItem,
  loadingState,
}: {
  cart: Product[];
  onRemoveItem: (id: number) => void;
  loadingState: LoadingState;
}) => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [subtotal, setSubtotal] = useState<number>(0);
  useEffect(() => {
    if (cart.length !== 0) {
      const subtotal = sumPrices(cart);
      setSubtotal(subtotal);
    }
  }, [cart]);
  const sumPrices = (cart: Product[]) => {
    return cart
      .map(elemet => Number(elemet.price))
      .reduce((acc, price) => {
        const subtotal = Number(acc) + Number(price);
        return subtotal;
      }, 0);
  };
  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      {cart.length !== 0 ?
            <Card
            style={{marginHorizontal: 20}}
            contentStyle={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingBottom: 10
            }}>
            <Card.Content>
              <Text>{`Total items: ${cart.length}`}</Text>
              <Text>
                Subtotal: {subtotal}
                {cart[0].currency}
              </Text>
              <Text>Shipping price: 5{cart[0].currency}</Text>
              <Text style={{fontWeight:'bold'}}>Total price: {subtotal+5}{cart[0].currency}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained">Buy</Button>
            </Card.Actions>
          </Card>
      :null}

      <ScrollView style={{marginHorizontal: 20}}>
        {cart.length !== 0 ? (
          cart.map((product, index) => (
            <Card
              key={index}
              style={{marginVertical: 10}}
              contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
              <Card.Content>
                <Image
                  style={{height: 140, width: 140}}
                  source={{uri: product.images[0]}}
                  resizeMode="contain"
                />
              </Card.Content>
              <View
                style={{
                  backgroundColor: 'grey',
                  height: 120,
                  width: 2,
                }}></View>
              <Card.Content style={{flex: 1}}>
                <Text
                  variant="titleMedium"
                  style={{flexWrap: 'wrap', maxWidth: '100%'}}>
                  {product.name}
                </Text>
                <Divider />
                <Text variant="bodyMedium">{`${product.price}${product.currency}`}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <IconButton
                    mode="outlined"
                    containerColor={theme.colors.onSecondary}
                    iconColor={theme.colors.secondary}
                    icon="eye"
                    onPress={() =>
                      navigation.push('MainTabs', {
                        screen: 'Home',
                        params: {
                          screen: 'Product detail',
                          params: {
                            productId: product.id,
                            viewMode: 'presentation',
                            navigationFromCart: true,
                          },
                        },
                      })
                    }
                  />

                  <IconButton
                    mode="outlined"
                    containerColor={theme.colors.onSecondary}
                    iconColor={theme.colors.secondary}
                    icon="trash-can"
                    onPress={() => {
                      if (product.id) {
                        onRemoveItem(product.id);
                      }
                    }}
                  />
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={{alignSelf: 'center'}}>Your cart is empty !</Text>
        )}
      </ScrollView>
    </View>
  );
};
