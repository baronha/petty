import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import style from './style';
import Image from 'react-native-fast-image';
import {ImageBackground, View, TouchableOpacity} from 'react-native';
import {MoreHoriontalIcon} from '../../../../../../utils/icon';
import NavigationService from '../../../../../../navigators/NavigationService';

const Item = ({item}) => {
  const color =
    item.type === 'dog'
      ? '#F2DAC7'
      : item.type === 'cat'
      ? '#C3D6BE'
      : item.type === 'fish'
      ? '#CAE3E3'
      : item.type === 'bird' && '#F0E2E2';

  const goDetail = () => {
    NavigationService.navigate('PetDetailScreen', {petId: item.id});
  };

  return (
    <TouchableOpacity
      onPress={goDetail}
      style={[
        style.container,
        {
          backgroundColor: color,
        },
      ]}>
      <Image style={style.image} source={{uri: item.images[0]}} />
      <View style={style.info}>
        <Text style={style.name}>{item.name}</Text>
        <Text style={style.requestCount}>2 yêu cầu nhận nuôi</Text>
      </View>
      <TouchableOpacity style={style.moreButton}>
        <MoreHoriontalIcon width={24} height={24} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Item;
