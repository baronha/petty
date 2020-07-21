import React, {useState, useMemo, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
} from 'react-native';
import style from './style';
import {Button, Input} from '@ui-kitten/components';
import {CloseIcon} from '../../../../../../utils/icon';
import {validateEmail} from '../../../../../../utils/helpers';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import Lottie from 'lottie-react-native';

const SignUpForm = ({getUserInfo, onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSignUp = () => {
    setLoading(true);
    if (email !== '') {
      if (validateEmail(email)) {
        firestore()
          .collection('users')
          .where('email', '==', email)
          .get()
          .then(querySnapshot => {
            if (!querySnapshot.empty) {
              setError('Tài khoản đã tồn tại');
              setLoading(false);
            } else {
              if (password !== '') {
                if (password.length >= 8) {
                  if (confirmPassword !== '') {
                    if (confirmPassword === password) {
                      setError('');
                      setLoading(false);
                      let userSignUpInfo = {
                        email,
                        password,
                      };
                      getUserInfo(userSignUpInfo);
                      onClose();
                    } else {
                      setError('Mật khẩu xác nhận không đúng');
                      setLoading(false);
                    }
                  } else {
                    setError('Bạn chưa xác nhận mật khẩu');
                    setLoading(false);
                  }
                } else {
                  setError('Mật khẩu quá ngắn');
                  setLoading(false);
                }
              } else {
                setError('Mật khẩu không được để trống');
                setLoading(false);
              }
            }
          });
      } else {
        setError('Email không đúng định dạng');
        setLoading(false);
      }
    } else {
      setError('Email không được để trống');
      setLoading(false);
    }
  };

  const handleSignup = () => {
    // if (firebase.auth().currentUser) {
    //   let userId = firebase.auth().currentUser._user;
    //   console.log(userId);
    //   // if (userId) {
    //   //   firebase
    //   //     .database()
    //   //     .ref('users/' + userId)
    //   //     .set({
    //   //       firstname: firstname,
    //   //       lastname: lastname,
    //   //       email: email,
    //   //       password: password,
    //   //       town: town,
    //   //       addInterest: addInterest,
    //   //       photoUrl: false,
    //   //       emailVerified: false,
    //   //       uid: userId,
    //   //       status: true,
    //   //       online: true,
    //   //     });
    //   // }
    // }
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     setError('Tài khoản đã tồn tại');
    //   }
    // });
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={style.container}>
      <View style={style.container}>
        <KeyboardAvoidingView behavior={'position'} style={style.container}>
          <ImageBackground
            style={style.imageBackground}
            source={require('../../../../../../assets/images/sign-up/sign-up.png')}>
            <View style={style.header}>
              <TouchableOpacity onPress={onClose}>
                <CloseIcon width={32} height={32} fill={'#000'} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={style.titleView}>
            <Text style={style.title}>Đăng ký</Text>
            {error !== '' && (
              <Animatable.Text animation={'shake'} style={style.errorText}>
                {error}
              </Animatable.Text>
            )}
          </View>
          <View style={style.inputView}>
            <Input
              textStyle={style.textStyle}
              placeholder={'Petty@gmail.com'}
              autoCorrect={false}
              label={'Email'}
              labelStyle={style.label}
              style={style.textInput}
              value={email}
              onChangeText={setEmail}
              autoCapitalize={'none'}
            />
            <Input
              textStyle={style.textStyle}
              placeholder={'• • • • • • • • •'}
              autoCorrect={false}
              style={style.textInput}
              secureTextEntry={true}
              label={'Mật khẩu'}
              labelStyle={style.label}
              value={password}
              onChangeText={setPassword}
              autoCapitalize={'none'}
            />
            {password.length >= 8 && (
              <Animatable.View animation={'fadeIn'}>
                <Input
                  textStyle={style.textStyle}
                  placeholder={'• • • • • • • • •'}
                  autoCorrect={false}
                  style={style.textInput}
                  secureTextEntry={true}
                  label={'Xác nhận mật khẩu'}
                  labelStyle={style.label}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </Animatable.View>
            )}

            {/* </View> */}
          </View>
          <TouchableOpacity onPress={onSignUp} style={style.buttonSignUp}>
            {isLoading ? (
              <Lottie
                style={style.lottie}
                autoPlay
                source={require('../../../../../../assets/lotties/loading.json')}
              />
            ) : (
              <Text style={style.textSignUp}>Tiếp tục</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpForm;
