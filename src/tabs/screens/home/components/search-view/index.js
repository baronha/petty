import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Layout, TopNavigationAction} from '@ui-kitten/components';
import style from './style';
import {SearchIcon} from '../../../../../utils/icon';
import NavigationService from '../../../../../navigators/NavigationService';
import {Text} from '../../../../../components';

const SearchView = () => {
  return (
    <View style={style.conatiner}>
      <Text text={'searchTitle'} style={style.title} />
      <TouchableOpacity onPress={() => NavigationService.navigate('Search')}>
        <Layout style={style.searchView} level={'3'}>
          <TopNavigationAction icon={SearchIcon} />
          <Text text={'searchPlaceholder'} style={style.searchPlaceholder} />
        </Layout>
      </TouchableOpacity>
    </View>
  );
};

export default SearchView;
