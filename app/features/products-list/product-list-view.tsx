import {View, FlatList, Dimensions, Image, Pressable} from 'react-native';
import {Card, Divider, ActivityIndicator, ProgressBar} from 'react-native-paper';
import {LoadingState, Product} from '../../models/models';
import React from 'react';
import {FilteredSearch} from '../../components/filtered-search';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../navigation/navigation-types';
export const ProductsList = ({
  handleLoadMore,
  products,
  onFilteredSearch,
  filteredProducts,
  loadingState,
  userId,
  page,
  lastPage,
}: {
  handleLoadMore: () => void;
  products: Product[];
  onFilteredSearch: (name: string) => void;
  filteredProducts: Product[];
  loadingState: LoadingState;
  userId: number | undefined;
  page: number;
  lastPage: number;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {width, height} = Dimensions.get('screen');

  const ListItem = React.memo(({item}: {item: Product}) => (
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
      }}>
      <Card style={{width, flex: 1}}>
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
  ));

  const combinedData = [
    {type: 'verticalList', data: filteredProducts},
    {type: 'horizontalList', data: products},
  ];

  return (
    <View style={{marginTop: 5, marginHorizontal: 5}}>
      <FilteredSearch
        loadingState={loadingState}
        onFilteredSearch={onFilteredSearch}
      />
      <FlatList
        style={{marginTop: 10}}
        data={combinedData}
        horizontal={false}
        renderItem={({item, index}) => {
          if (item.type === 'verticalList' && item.data.length !== 0) {
            return (
              <FlatList
              key={index}
                style={{marginBottom: 10}}
                data={item.data}
                pagingEnabled
                snapToInterval={width}
                decelerationRate={'fast'}
                horizontal={false}
                renderItem={({item, index}) => (
                  <Pressable
                  key={index}
                    style={{paddingVertical: 5}}
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
            )
          }
          return (
            <FlatList
              style={{marginBottom: filteredProducts.length !== 0 ? 50 : 5}}
              data={item.data}
              pagingEnabled
              snapToInterval={width}
              decelerationRate={'fast'}
              horizontal={false}
              onEndReached={() => {
                if (loadingState === 'idle') {
                  handleLoadMore();
                }
              }}
              renderItem={({item, index}) => (
            <ListItem key={index} item={item} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          loadingState === 'loading' ?  <ProgressBar indeterminate={true} /> : null
        }
      />
    </View>
  );
};
