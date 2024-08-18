import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {Card, Divider, ActivityIndicator} from 'react-native-paper';
import {LoadingState, Product} from '../../../models/models';
import {useEffect, useRef} from 'react';
import {FilteredSearch} from '../../components/filtered-search';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigation/navigation-types';

export const ProductsList = ({
  products,
  onFilteredSearch,
  filteredProducts,
  loadingState,
  userId,
}: {
  products: Product[];
  onFilteredSearch: (name: string) => void;
  filteredProducts: Product[];
  loadingState: LoadingState;
  userId: number | undefined;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const flatListRef = useRef<FlatList<Product>>(null);
  const {width} = Dimensions.get('window');

  const combinedData = [
    {type: 'verticalList', data: filteredProducts},
    {type: 'horizontalList', data: products},
  ];
  if (loadingState === 'loading') {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <FilteredSearch
        loadingState={loadingState}
        onFilteredSearch={onFilteredSearch}
      />
      <FlatList
      data={combinedData}
      renderItem={({ item }) => {
        if (item.type === 'verticalList' && item.data.length !== 0) {
          return (
            <FlatList
              style={{ marginBottom: 5 }}
              data={item.data}
              pagingEnabled
              snapToInterval={width}
              decelerationRate={'fast'}
              horizontal={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    if (item.userId === userId) {
                      navigation.replace('MainTabs', {
                        screen: 'Sell',
                        params: {
                          productId: item.id,
                          viewMode: 'edit',
                        },
                      });
                    } else {
                      navigation.replace('MainTabs', {
                        screen: 'Home',
                        params: {
                          screen: 'Product detail',
                          params: {
                            productId: item.id,
                            viewMode: 'presentation',
                          },
                        },
                      });
                    }
                  }}
                >
                  <Card style={{ width }}>
                    <Card.Title title={item.name} />
                    <Divider horizontalInset style={{ marginBottom: 10 }} />
                    <Card.Content>
                      <Image
                        style={{ height: 200 }}
                        resizeMode="contain"
                        source={{ uri: item.images[0] }}
                      />
                    </Card.Content>
                  </Card>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          );
        } 
          return (
            <FlatList
              ref={flatListRef}
              data={item.data}
              pagingEnabled
              snapToInterval={width}
              decelerationRate={'fast'}
              horizontal
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    if (item.userId === userId) {
                      navigation.replace('MainTabs', {
                        screen: 'Sell',
                        params: {
                          productId: item.id,
                          viewMode: 'edit',
                        },
                      });
                    } else {
                      navigation.navigate('MainTabs', {
                        screen: 'Home',
                        params: {
                          screen: 'Product detail',
                          params: {
                            productId: item.id,
                            viewMode: 'presentation',
                          },
                        },
                      });
                    }
                  }}
                >
                  <Card style={{ width }}>
                    <Card.Title title={item.name} />
                    <Divider horizontalInset style={{ marginBottom: 10 }} />
                    <Card.Content>
                      <Image
                        style={{ height: 200 }}
                        resizeMode="contain"
                        source={{ uri: item.images[0] }}
                      />
                    </Card.Content>
                  </Card>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          );
        
       
      }}
      keyExtractor={(item, index) => index.toString()}
    />
      {/* <ScrollView>
        {filteredProducts.length !== 0 ? (
          <>
            <FlatList
              style={{marginBottom: 5}}
              data={filteredProducts}
              pagingEnabled
              snapToInterval={width}
              decelerationRate={'fast'}
              horizontal
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    if (item.userId === userId) {
                      navigation.replace('MainTabs', {
                        screen: 'Sell',
                        params: {
                          productId: item.id,
                          viewMode: 'edit',
                        },
                      });
                    } else
                      navigation.replace('MainTabs', {
                        screen: 'Home',
                        params: {
                          screen: 'Product detail',
                          params: {
                            productId: item.id,
                            viewMode: 'presentation',
                          },
                        },
                      });
                  }}>
                  <Card style={{width}}>
                    <Card.Title title={item.name} />
                    <Divider horizontalInset style={{marginBottom: 10}} />
                    <Card.Content>
                      <Image
                        style={{height: 200}}
                        resizeMode="contain"
                        source={{uri: item.images[0]}}
                      />
                    </Card.Content>
                  </Card>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        ) : null}
        <FlatList
          ref={flatListRef}
          data={products}
          pagingEnabled
          snapToInterval={width}
          decelerationRate={'fast'}
          horizontal
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                if (item.userId === userId) {
                  navigation.replace('MainTabs', {
                    screen: 'Sell',
                    params: {
                      productId: item.id,
                      viewMode: 'edit',
                    },
                  });
                } else
                  navigation.navigate('MainTabs', {
                    screen: 'Home',
                    params: {
                      screen: 'Product detail',
                      params: {
                        productId: item.id,
                        viewMode: 'presentation',
                      },
                    },
                  });
              }}>
              <Card style={{width}}>
                <Card.Title title={item.name} />
                <Divider horizontalInset style={{marginBottom: 10}} />
                <Card.Content>
                  <Image
                    style={{height: 200}}
                    resizeMode="contain"
                    source={{uri: item.images[0]}}
                  />
                </Card.Content>
              </Card>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView> */}
    </>
  );
};
