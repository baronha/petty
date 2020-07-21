import React, {useState} from 'react';
import {TouchableOpacity, Image, Dimensions} from 'react-native';
import {
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import style from './style';
import {CameraFillIcon, CloseCirlcleFillIcon, CloseIcon} from '../../../../../utils/icon';
import ImagePicker from 'react-native-image-crop-picker';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 4 - 28;

const Picker = ({images, setImages}) => {
  const theme = useTheme();
  const onPick = () => {
    ImagePicker.openPicker({
      // width: WIDTH_IMAGE,
      // height: WIDTH_IMAGE,
      multiple: true,
      cropping: true,
      useFrontCamera: true,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      maxFiles: 10,
    }).then(image => {
      let imageArray = [...images];
      let imagesTemp = image.map(i => {
        return i.path;
      });
      if (images.length > 0) {
        imagesTemp.map((item, index) => {
          imageArray.push(item);
        });
        setImages(imageArray);
      } else {
        setImages(imagesTemp);
      }
    });
  };

  const onDeleteImage = (index) => {
      let imageArray = [...images]
      imageArray.splice(index,1)
      setImages(imageArray)
  };

  return (
    <Layout level={'2'} style={style.container}>
      <Image
        source={require('../../../../../assets/images/paws/paws.png')}
        style={style.fingerImage}
      />
      {images.length > 0 &&
        images.map((item, index) => {
          return (
            <Layout>
              <Image
                key={index}
                source={{uri: item}}
                style={style.imageButton}
              />
              <TouchableOpacity onPress={()=>onDeleteImage(index)} style={style.deleteButton}  >
                  <CloseIcon width={16} height={16} fill={theme['color-danger-500']} />
              </TouchableOpacity>
            </Layout>
          );
        })}
      <Layout
        style={[
          style.imageButton,
          {
            backgroundColor: theme['color-basic-transparent-500'],
          },
        ]}>
        <TopNavigationAction onPress={onPick} icon={CameraFillIcon} />
      </Layout>
    </Layout>
  );
};

export default Picker;
