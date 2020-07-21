import React, {useEffect, useState} from 'react';
import {FlatList, Animated, TouchableOpacity, Image} from 'react-native';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import style from './style';
import {Header} from '../../../../components';
import firestore from '@react-native-firebase/firestore';
import {Item} from './components';
import {PlusIcon} from '../../../../utils/icon';
import NavigationService from '../../../../navigators/NavigationService';

const PetList = ({route}) => {
  const userInfo = route.params?.userInfo;
  const [scrollY] = useState(new Animated.Value(0));
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const subscriber = firestore()
      .collection('pets')
      .where('uploader.doc_id', '==', userInfo.doc_id)
      .onSnapshot(querySnapshot => {
        if (userInfo) {
          const pets = [];
          querySnapshot.forEach(documentSnapshot => {
            pets.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setData(pets);
          setLoading(false);
        }
      });
    return () => subscriber();
  }, []);

  const goAddPet = () => {
    NavigationService.navigate('AddPetScreen');
  };

  const renderFooter = (
    <TouchableOpacity
      onPress={goAddPet}
      style={[
        style.buttonAdd,
        {
          borderColor: theme['text-basic-color'] + '92',
        },
      ]}>
      <Image
        source={require('../../../../assets/images/paws/paws.png')}
        style={[
          style.imageBackgroundFooter,
          {
            tintColor: 'rgba(0,0,0,0.1)',
          },
        ]}
        borderRadius={8}
      />
      <Layout style={[style.buttonAddView,{
        backgroundColor: theme['text-basic-color']
      }]}>
        <PlusIcon width={24} height={24} fill={theme['background-basic-color-1']} />
      </Layout>
    </TouchableOpacity>
  );

  return (
    <Layout style={style.container}>
      <Header title={'Thú cưng của bạn'} scrollY={scrollY} />

      {!isLoading && (
        <FlatList
          data={data}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}},
          ])}
          ListHeaderComponent={
            <Text style={style.title}>Thú cưng của bạn</Text>
          }
          scrollIndicatorInsets={{right: 1}}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return <Item item={item} key={item.id} />;
          }}
          ListFooterComponent={renderFooter}
        />
      )}
    </Layout>
  );
};

export default PetList;
