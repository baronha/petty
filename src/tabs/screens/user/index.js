import React, {useEffect, useState} from 'react';
import {
  Button,
  Layout,
  Text,
  useTheme,
  TopNavigationAction,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import style from './style';
import {getUserInfo} from '../../../utils/helpers';
import {Image, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {MenuIcon} from '../../../utils/icon';
import {useSafeArea} from 'react-native-safe-area-context';

const UserScreen = ({navigation}) => {
  const theme = useTheme();
  const insets = useSafeArea();
  const [dataUser, setDataUser] = useState({});
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    getUserInfoData();
  }, []);

  const getUserInfoData = async () => {
    const userInfo = await getUserInfo();
    if (userInfo !== null) {
      setDataUser(JSON.parse(userInfo));
    }
  };

  const info = (textHint, number, alignItems) => {
    return (
      <View style={style.infoItem}>
        <View
          style={{
            alignItems,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                style.infoHint,
                {
                  color: theme['text-hint-color'],
                },
              ]}
              numberOfLines={1}>
              {textHint}
            </Text>
            <Text style={style.textNumber}>{number}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout
      style={[
        style.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <ScrollView style={style.container}>
        <Layout style={style.top}>
          <Image
            defaultSource={require('../../../assets/images/avatar-default/avatar-default.png')}
            style={style.avatar}
            source={{uri: dataUser?.avatar || ''}}
          />
          <Text style={style.name}>{dataUser?.name}</Text>
          <Text
            style={[
              style.userName,
              {
                color: theme['text-basic-color'] + '92',
              },
            ]}>
            {dataUser?.user_name}
          </Text>
          <Layout level={'2'} style={style.infoView}>
            {info('Bài viết', '19', 'flex-start')}
            {info('Người theo dõi', '19k', 'center')}
            {info('Đang theo dõi', '1', 'flex-end')}
          </Layout>
        </Layout>
        <Button style={style.buttonEdit}>Chỉnh sửa</Button>
      </ScrollView>
      <TopNavigationAction
        icon={MenuIcon}
        style={[
          style.menu,
          {
            marginTop: insets.top,
          },
        ]}
      />
    </Layout>
  );
};

export default UserScreen;
