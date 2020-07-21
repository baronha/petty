import React from 'react';
import {
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import style from './style';
import {BackIcon} from '../../../../utils/icon';
import NavigationService from '../../../../navigators/NavigationService';
import {TouchableOpacity, Image} from 'react-native';

const Header = ({friendInfo}) => {
  const theme = useTheme();
  return (
    <Layout style={style.container}>
      <TopNavigationAction
        style={style.backButton}
        icon={() => <BackIcon color={theme['text-basic-color']} />}
        onPress={() => NavigationService.goBack()}
      />
      <Layout style={style.userView}>
        <Text style={style.userName}>{friendInfo.name}</Text>
        <Text style={style.time}>{friendInfo.user_name}</Text>
      </Layout>
      <TouchableOpacity style={style.avatarView}>
        <Image
          defaultSource={require('../../../../assets/images/placeholder/placeholder.png')}
          source={{
            uri:
              friendInfo.avatar ||
              'https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/system_images%2Fplaceholder.png?alt=media&token=b7790dad-42da-4e58-9b31-dd2b77872b68',
          }}
          style={style.avatar}
        />
      </TouchableOpacity>
    </Layout>
  );
};

export default Header;
