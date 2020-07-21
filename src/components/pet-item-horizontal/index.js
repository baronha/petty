import React from 'react';
import Image from 'react-native-fast-image';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import style from './style';
import {TouchableOpacity} from 'react-native';
import {GenderMale, GenderFemale} from '../../utils/icon';
import NavigationService from '../../navigators/NavigationService';

const PetItemHorizontal = ({item, containerStyle}) => {
  const theme = useTheme();

  const onGoDetail = () => {
    NavigationService.navigate('PetDetailScreen', {petId: item.id});
  };

  return (
    <Layout style={[style.container, containerStyle]}>
      <TouchableOpacity onPress={onGoDetail}>
        <Image
          style={[
            style.image,
            {
              backgroundColor: theme['background-basic-color-2'],
            },
          ]}
          source={{uri: item.images[0]}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoDetail} style={style.titleView}>
        <Text numberOfLines={1} style={style.title}>
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
      <Text style={style.distance}>
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
  );
};

export default PetItemHorizontal;
