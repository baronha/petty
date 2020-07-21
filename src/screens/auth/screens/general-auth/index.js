import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import style from './style';
import {Header} from '../../components';
import {Button, Input} from '@ui-kitten/components';
import {LoginForm, SignUpForm} from './components';
import NavigationService from '../../../../navigators/NavigationService';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

const {width} = Dimensions.get('window');

const FacebookIcon = () => {
  return (
    <Image
      source={require('../../../../assets/images/facebook-icon/facebook-icon.png')}
      style={style.facebookIcon}
    />
  );
};

const GeneralAuthScreen = ({route}) => {
  const isSignUp = route.params?.signUp ?? false;
  const isLogin = route.params?.login ?? false;
  const [visibleForm, setVisibleForm] = useState(isLogin);
  const [isModalSignUp, setModalSignUp] = useState(isSignUp);

  let imgRef = useRef();

  const onShowLoginForm = () => {
    setVisibleForm(true);
  };

  const onSignUp = value => {
    NavigationService.navigate('VerifyPhoneNumberScreen', {
      userSignUpInfo: value,
    });
  };

  const goBack = () => {
    if (visibleForm) {
      setVisibleForm(false);
    } else {
      NavigationService.goBack();
    }
  };

  const toggleModalSignUp = () => {
    setModalSignUp(true);
  };

  const onDismissModalSignUp = () => {
    setModalSignUp(false);
  };

  const onDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <View style={style.container}>
        <StatusBar barStyle={'dark-content'} />
        <Modal
          visible={isModalSignUp}
          onDismiss={onDismissModalSignUp}
          animationType={'slide'}
          style={{flex: 1, backgroundColor: 'white', margin: 0}}
          presentationStyle={'pageSheet'}
          transparent={false}>
          <SignUpForm getUserInfo={onSignUp} onClose={onDismissModalSignUp} />
        </Modal>
        <Header onPress={goBack} />
        <Animatable.Image
          style={[
            style.image,
            {
              height: !visibleForm ? width - 48 : null,
              flex: visibleForm ? 1 : 0,
            },
          ]}
          source={require('../../../../assets/images/login/login.png')}
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={ref => (imgRef = ref)}
        />
        {!visibleForm && (
          <View>
            <Animatable.Text
              animation={'bounceIn'}
              duration={500}
              style={style.titleMain}>
              Xin chào
            </Animatable.Text>
            <Text style={style.subTitle}>
              Mời bạn đăng nhập để tiếp tục trải nghiệm cùng Petty
            </Text>
          </View>
        )}
        {!visibleForm ? (
          <Animatable.View animation={'bounceIn'} style={style.buttonGroup}>
            <Button onPress={onShowLoginForm}>Đăng nhập</Button>
            <Button
              onPress={toggleModalSignUp}
              style={style.signUp}
              textStyle={style.signUpText}
              // size='large'
            >
              Đăng ký
            </Button>
            <Text style={style.textOr}>Hoặc</Text>
            <TouchableOpacity style={style.facebookButton}>
              <FacebookIcon />
              <Text style={style.facebookText}>Đăng nhập bằng Facebook</Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <KeyboardAvoidingView
            behavior={'padding'}
            style={visibleForm ? {flex: 1} : {height: 0, opacity: 0}}>
            <Animatable.View animation={'bounceIn'}>
              <LoginForm />
              <Text style={style.subTitle}>Nếu bạn chưa có tài khoản</Text>
              <View
                style={{
                  paddingHorizontal: 24,
                  marginTop: -12,
                }}>
                <Button
                  style={style.signUp}
                  textStyle={style.signUpText}
                  onPress={toggleModalSignUp}>
                  Đăng ký
                </Button>
              </View>
            </Animatable.View>
          </KeyboardAvoidingView>
        )}
        <TouchableOpacity style={style.forgotPassword}>
          <Text style={style.forgotText}>Quên mật khẩu</Text>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GeneralAuthScreen;
