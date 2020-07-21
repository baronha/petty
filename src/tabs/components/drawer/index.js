import React, {useState} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import style from './style';
import {Icon, Layout, useTheme, Text} from '@ui-kitten/components';
import NavigationService from '../../../navigators/NavigationService';
import {useEffect} from 'react';
import {getUserInfo} from '../../../utils/helpers';
import {connect} from 'react-redux';
import {LOG_IN_SUCCESS} from '../../../screens/auth/utils/type';

const ICON_SIZE = 24;

let dataMenu = [
  {
    id: 0,
    screen: 'PetListScreen',
    title: 'Thú cưng của bạn',
    image: require('../../../assets/images/home-active/home-active.png'),
  },
  {
    id: 1,
    screen: 'WishListScreen',
    title: 'Thú cưng yêu thích',
    icon: 'heart-outline',
  },
  {
    id: 2,
    screen: 'PetRequestListScreen',
    title: 'Gửi yêu cầu nhận nuôi',
    icon: 'grid-outline',
  },
  {
    id: 3,
    screen: 'ErrorRequestScreen',
    title: 'Báo lỗi ứng dụng',
    icon: 'alert-triangle-outline',
  },
  {
    id: 4,
    screen: 'SettingScreen',
    title: 'Cài đặt',
    icon: 'settings-outline',
  },
];

const Drawer = ({typeLogin}) => {
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState(undefined);
  const [buttonData, setButtonData] = useState(dataMenu);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (typeLogin === LOG_IN_SUCCESS) {
      getUser();
      setButtonData(dataMenu);
    }
  }, [typeLogin]);

  const getUser = async () => {
    const result = await getUserInfo();
    if (result) {
      const user = JSON.parse(result);
      setUserInfo(user);
    } else {
      let menuData = [...dataMenu];
      menuData.splice(0, 3);
      setButtonData(menuData);
    }
  };

  const onPress = screen => {
    NavigationService.navigate(screen, {userInfo});
  };

  const goLogin = () => {
    NavigationService.navigate('GeneralAuthScreen', {login: true});
  };

  const goSignUp = () => {
    NavigationService.navigate('GeneralAuthScreen', {signUp: true});
  };

  const buttonItem = (title, screen, iconName, imageSource, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPress(screen)}
        style={style.buttonItem}>
        <Layout level={'2'} style={style.iconView}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={[
                {
                  tintColor: theme['text-basic-color'],
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                },
              ]}
            />
          ) : (
            <Icon
              name={iconName}
              width={ICON_SIZE}
              height={ICON_SIZE}
              fill={theme['text-basic-color']}
            />
          )}
        </Layout>
        <Text style={style.title}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={style.container}>
      {!userInfo && (
        <View style={[style.layoutAuth, style.row]}>
          <Image
            style={style.imageAuth}
            source={require('../../../assets/images/logo/logo.png')}
          />
          <View style={style.rightAuth}>
            <Text style={style.des}>
              Vui lòng đăng nhập để trải nghệm tốt hơn
            </Text>
            <View style={style.row}>
              <TouchableOpacity
                onPress={goSignUp}
                style={[style.buttonSignIn, style.button]}>
                <Text style={style.textButton}>Đăng ký</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goLogin}
                style={[style.buttonLogin, style.button]}>
                <Text style={style.textButton}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {buttonData.map((item, index) => {
        return buttonItem(
          item.title,
          item.screen,
          item.icon,
          item.image,
          index,
        );
      })}
      <Image
        source={require('../../../assets/images/corgi/corgi.png')}
        style={style.corgiImage}
      />
    </Layout>
  );
};

const mapStateToProps = state => ({
  typeLogin: state.userApi.type,
});

export default connect(mapStateToProps)(Drawer);
