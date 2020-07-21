import React, {useEffect} from 'react';
import {Layout} from '@ui-kitten/components';
import {ScrollView, Text} from 'react-native';
import {convertInfo} from '../../../../utils/helpers';
import style from './style';
import {
  GenderMale,
  GenderTransgender,
  GenderFemale,
} from '../../../../utils/icon';

const InfoArray = ({data}) => {
  const renderInfo = item => {
    let key = Object.keys(item);
    let value = Object.values(item)[0];
    // console.log(key)
    switch (key[0]) {
      case 'gender':
        return (
          <Layout
            key={key}
            level={'2'}
            style={[
              style.info,
              {
                backgroundColor: '#FEECE8',
              },
            ]}>
            {value === 'male' ? (
              <GenderMale />
            ) : value === 'female' ? (
              <GenderFemale />
            ) : (
              <GenderTransgender />
            )}
            <Text style={style.textLabelInfo}>Giới tính</Text>
          </Layout>
        );
      case 'age':
        return (
          <Layout
            key={key}
            level={'2'}
            style={[
              style.info,
              {
                backgroundColor: '#EBF0FC',
              },
            ]}>
            <Text style={style.textInfo}>{value.value}</Text>
            <Text style={style.textLabelInfo}>
              {value.age_type === 'month' ? 'Tháng' : 'Năm'} tuổi
            </Text>
          </Layout>
        );
      case 'weight':
        return (
          <Layout
            key={key}
            level={'2'}
            style={[
              style.info,
              {
                backgroundColor: '#FFFBE2',
              },
            ]}>
            <Text style={style.textInfo}>{value} Kg</Text>
            <Text style={style.textLabelInfo}>Cân nặng</Text>
          </Layout>
        );
      case 'health':
        return (
          <Layout
            key={key}
            level={'2'}
            style={[
              style.info,
              {
                backgroundColor: '#EBF5E3',
              },
            ]}>
            <Text style={style.textInfo}>{value} %</Text>
            <Text style={style.textLabelInfo}>Sức khoẻ</Text>
          </Layout>
        );
    }
  };
  return (
    (data.age || data.health || data.gender || data.weight) && (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style.container}
        contentContainerStyle={{
          paddingLeft: 24,
        }}>
        {convertInfo(data).map((item, index) => {
          return renderInfo(item);
        })}
      </ScrollView>
    )
  );
};

export default InfoArray;
