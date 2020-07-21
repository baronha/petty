import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import Image from 'react-native-fast-image';
import style from './style';
import {ArrowForward, GenderFemale, GenderMale} from '../../utils/icon';
import NavigationService from '../../navigators/NavigationService';

const PetItemVertical = ({item}) => {
  const theme = useTheme();
  const goDetail = () => {
    NavigationService.navigate('PetDetailScreen', {petId: item.id});
  };

  return (
    <Layout style={style.container}>
      <TouchableOpacity onPress={goDetail}>
        <Image style={style.avatar} source={{uri: item.images[0]}} />
      </TouchableOpacity>
      <Layout style={style.nameView}>
        <TouchableOpacity onPress={goDetail} style={style.buttonName}>
          <Text style={style.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Layout style={style.gender}>
            {item.gender == 'male' ? (
              <GenderMale size={20} color={theme['text-basic-color']} />
            ) : (
              <GenderFemale size={20} color={theme['text-basic-color']} />
            )}
          </Layout>
        </TouchableOpacity>
        <Text style={style.type}>
          {item?.age === null
            ? 'Không xác định tuổi'
            : item?.age?.value +
              ' ' +
              (item?.age?.age_type === 'year' ? 'tuổi' : 'tháng tuổi')}
        </Text>
        {item.is_adopted && (
          <Text style={style.textAdopted}>Đã được nhận nuôi</Text>
        )}
      </Layout>
      <TouchableOpacity onPress={goDetail} style={style.button}>
        <ArrowForward height={24} width={24} />
      </TouchableOpacity>
    </Layout>
  );
};

export default PetItemVertical;
