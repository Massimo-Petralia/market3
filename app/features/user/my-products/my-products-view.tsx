import {View, Pressable} from 'react-native';
import {LoadingState, Product} from '../../../../models/models';
import {ActivityIndicator, DataTable, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../navigation/navigation-types';

export const MyProducts = ({
  myProducts,
  loadingState,
}: {
  myProducts: Product[];
  loadingState: LoadingState;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Preview</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>
        {myProducts.slice(0, myProducts.length).map((product, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{`Preview ${index}`}</DataTable.Cell>
            <DataTable.Cell>
              <Pressable
                onPress={() =>
                  navigation.navigate('MainTabs', {
                    screen: 'Sell',
                    params: {
                      productId: product.id,
                      viewMode: 'edit',
                    },
                  })
                }>
                <Text>{product.name}</Text>
              </Pressable>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};
