import {View, Pressable, Image, ScrollView} from 'react-native';
import {LoadingState, Product} from '../../../models/models';
import {ActivityIndicator, DataTable, Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigation/navigation-types';

export const MyProducts = ({
  myProducts,
  loadingState,
}: {
  myProducts: Product[];
  loadingState: LoadingState;
}) => {
  const theme = useTheme()
  const navigation = useNavigation<RootStackNavigationProp>();
  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Preview</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>
        {myProducts.slice(0, myProducts.length).map((product, index) => (
              <Pressable
              key={index}
              android_ripple={{color: theme.colors.onPrimaryContainer}}
              onPress={() =>
                navigation.replace('MainTabs', {
                  screen: 'Sell',
                  params: {
                    productId: product.id,
                    viewMode: 'edit',
                  },
                })
              }>
          <DataTable.Row key={index} style={{height:90}}>
            <DataTable.Cell>
              <Image style={{height: 80, width:80}} resizeMode='contain' source={{uri: product.images[0]}} />
            </DataTable.Cell>
            <DataTable.Cell>
          
                <Text>{product.name}</Text>
            </DataTable.Cell>
          </DataTable.Row>
              </Pressable>

        ))}
      </DataTable>
    </ScrollView>
  );
};
