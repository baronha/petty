import React, {useEffect, useState, useContext} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {Text, TopNavigationAction} from '@ui-kitten/components';
import {MenuIcon} from '../../../../../utils/icon';
import style from './style';
import {MenuContext} from '../../../../../utils/context';
import NavigationService from '../../../../../navigators/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

const Header = ({dataUser}) => {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    if (Object.entries(dataUser).length !== 0) {
      setLogin(true);
    }
  }, [dataUser]);

  const menuContext = useContext(MenuContext);

  const onPressUser = () => {
    if (isLogin) {
      NavigationService.navigate('User');
    } else {
      NavigationService.navigate('GeneralAuthScreen');
    }
  };

  const renderMenu = () => {
    return (
      <TopNavigationAction icon={MenuIcon} onPress={menuContext.toggleMenu} />
    );
  };

  return (
    <View style={style.container}>
      {renderMenu()}
      <View style={style.rightView}>
        <View
          style={[
            style.titleView,
            {
              flexDirection: !isLogin && 'column-reverse',
            },
          ]}>
          <Text style={style.welcomeText}>Xin chào</Text>
          <Text style={style.name}>{isLogin ? dataUser.name : 'Petty'}</Text>
        </View>
        <TouchableOpacity onPress={onPressUser} style={style.avatarView}>
          <Image
            defaultSource={require('../../../../../assets/images/avatar-default/avatar-default.png')}
            style={style.avatar}
            source={{
              uri: dataUser?.avatar ?? '',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
