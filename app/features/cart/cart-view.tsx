import {View, ScrollView, Pressable, Image} from 'react-native';
import {Text, Card, Divider} from 'react-native-paper';
import {Product} from '../../../models/models';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigation/navigation-types';

export const Cart = ({cart}: {cart: Product[]}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <ScrollView style={{marginHorizontal: 20}}>
      {cart.length !== 0 ? (
        cart.map((product, index) => (
          <Pressable
            key={index}
            style={{marginVertical: 10}}
            onPress={() =>
              navigation.push('MainTabs', {
                screen: 'Home',
                params: {
                  screen: 'Product detail',
                  params: {
                    productId: product.id,
                    viewMode: 'presentation',
                  },
                },
              })
            }>
            <Card contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
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
              </Card.Content>
            </Card>
          </Pressable>
        ))
      ) : (
        <Text style={{alignSelf: 'center'}}>Your cart is empty !</Text>
      )}
    </ScrollView>
  );
};
