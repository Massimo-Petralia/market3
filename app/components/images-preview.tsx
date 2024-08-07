import {View, Image} from 'react-native';
import {pick, types} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import PagerView from 'react-native-pager-view';
import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Text, useTheme} from 'react-native-paper';
import {DotIndicator} from './dot-indicator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IsProductDetail} from '../navigation/navigation-types';

export const ImagesPreview = ({
  handleImagesChanges,
  imagesNode,
  isProductDetail,
}: {
  handleImagesChanges?: (images: string[]) => void;
  imagesNode: string[];
  isProductDetail?: boolean;
}) => {
  const theme = useTheme();
  const [images, setImages] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const assignImages = (images: string[]) => {
    //forse non serve
    setImages(images);
  };
  const setImageField = (images: string[]) => {
    if (handleImagesChanges) {
      handleImagesChanges(images);
    }
  };
  const handleImagesSelection = React.useCallback(async () => {
    try {
      const response = await pick({
        type: [types.images],
        allowMultiSelection: true,
      });
      const images: string[] = [];
      for (let image of response) {
        const base64String = await RNFS.readFile(image.uri, 'base64');
        images.push(`data:image/${image.type};base64,${base64String}`);
      }

      // assignImages(images);
      setImageField(images);
    } catch (error) {
      console.error('Error: ', error);
    }
  }, []);

  useEffect(() => {
    setImages(imagesNode);
  }, [imagesNode]);

  return (
    <View>
      <PagerView
        useNext
        initialPage={0}
        pageMargin={10}
        onPageSelected={e => setCounter(e.nativeEvent.position)}>
        {images.map((image, index) => (
          <Card key={index}>
            <Card.Title title={`Preview .${index + 1}`} />
            <Divider horizontalInset style={{marginBottom: 15}} />
            <Card.Content>
              <Image
                style={{height: 140}}
                source={{uri: image}}
                resizeMode="contain"
              />
            </Card.Content>
          </Card>
        ))}
      </PagerView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        {images.map((item, index) => {
          return (
            <View key={index}>
              <DotIndicator index={index} counter={counter} />
            </View>
          );
        })}
      </View>
      {!isProductDetail ? (
        <Button
          style={{marginVertical: 10}}
          mode="contained"
          onPress={() => handleImagesSelection()}>
          <FontAwesome5 name="images" size={16} />
          <Text style={{color: theme.colors.onPrimary}}> Select</Text>
        </Button>
      ) : null}
    </View>
  );
};
