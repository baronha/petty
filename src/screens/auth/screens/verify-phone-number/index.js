import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import {Header} from '../../../../components';
import {Button} from '@ui-kitten/components';
import NavigationService from '../../../../navigators/NavigationService';
import Lottie from 'lottie-react-native';
import {validatePhoneNumber} from '../../../../utils/helpers';
import {View} from 'react-native-animatable';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {RefreshIcon} from '../../../../utils/icon';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
// import firestore from '@react-native-firebase/firestore';

const VerifyPhoneNumberScreen = ({route}) => {
  const {userSignUpInfo} = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visibleOTP, setVisibleOTP] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  const onSignIn = async () => {
    if (!isLoading) {
      if (!visibleOTP) {
        if (validatePhoneNumber(phoneNumber).isPhone) {
          setLoading(true);
          await auth()
            .verifyPhoneNumber(validatePhoneNumber(phoneNumber).formatNumber)
            .on('state_changed', phoneAuthSnapshot => {
              switch (phoneAuthSnapshot.state) {
                case auth.PhoneAuthState.CODE_SENT:
                  console.log('code sent', phoneAuthSnapshot);
                  setVisibleOTP(true);
                  setLoading(false);
                  setVerificationId(phoneAuthSnapshot.verificationId);
                  break;
                case auth.PhoneAuthState.ERROR: // or 'error'
                  console.log('verification error', phoneAuthSnapshot);
                  console.log(phoneAuthSnapshot.ERROR);
                  break;
              }
            });
        } else {
          Alert.alert('Số điện thoại của bạn không hợp lệ.');
        }
      } else {
        //set otp
        Alert.alert(
          'Mã OTP của bạn không đúng. Hãy chắc chắn rằng số điện thoại của bạn chính xác',
        );
      }
    } else {
      Alert.alert('Đợi chút nào ...');
    }
  };

  const onResendCode = async () => {
    await auth().verifyPhoneNumber(
      validatePhoneNumber(phoneNumber).formatNumber,
      true,
    );
  };

  const onFilledCode = code => {
    setLoading(true);
    Keyboard.dismiss();
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    auth()
      .signInWithCredential(credential)
      .then(result => {
        let userInfo = {
          email: userSignUpInfo.email,
          password: userSignUpInfo.password,
          is_new_user: result.additionalUserInfo.isNewUser,
          provider_id: result.additionalUserInfo.providerId,
          phone_number: phoneNumber,
          id: result.user.uid,
        };
        firestore()
          .collection('users')
          .add(userInfo)
          .then(result => {
            if (result) {
              firestore()
                .collection('contacts')
                .doc(result.id)
                .set({})
                .then(() => {
                  setLoading(false);
                  NavigationService.navigate('CreateUserInfoScreen', {
                    docId: result.id,
                    password: userSignUpInfo.password,
                  });
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        let userErrorMessage = '';
        if (error.code === 'auth/invalid-verification-code') {
          userErrorMessage = 'Sorry, that code was incorrect.';
        } else if (error.code === 'auth/user-disabled') {
          userErrorMessage = 'Sorry, this phone number has been blocked.';
        } else {
          // other internal error
          // see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#sign-inwith-credential
          userErrorMessage =
            "Sorry, we couldn't verify that phone number at the moment. " +
            'Please try again later. ' +
            '\n\nIf the issue persists, please contact support.';
        }
        Alert.alert(userErrorMessage);
        setLoading(false);
      });
  };

  const onBack = () => {
    if (!visibleOTP) {
      NavigationService.goBack();
    } else {
      setVisibleOTP(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style.container}>
        <Header onPress={onBack} />
        <View style={style.content}>
          <Text style={style.title}>
            {!visibleOTP
              ? 'Số điện thoại của bạn là gì ?'
              : 'Nhập mã OTP của bạn !'}
          </Text>
          {!visibleOTP ? (
            <View
              animation={'fadeIn'}
              delay={200}
              style={[
                style.phoneInputView,
                {
                  borderColor:
                    phoneNumber.length >= 9
                      ? '#FDBF50'
                      : phoneNumber.length < 1
                      ? '#F5F6FA'
                      : '#E84F8A',
                },
              ]}>
              <Image
                style={style.flag}
                source={require('../../../../assets/images/flags/vietnam-flag/vietnam-flag.png')}
              />
              <Text style={style.firstPhoneText}>+84</Text>
              <TextInput
                maxLength={10}
                value={phoneNumber}
                style={style.phoneInput}
                onChangeText={setPhoneNumber}
                placeholder={'0987654321'}
                autoCorrect={false}
                keyboardType={'phone-pad'}
                autoFocus
              />
            </View>
          ) : (
            <View animation={'fadeIn'}>
              <OTPInputView
                style={style.otpView}
                pinCount={6}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={style.underlineStyleBase}
                codeInputHighlightStyle={style.underlineStyleHighLighted}
                onCodeFilled={onFilledCode}
              />
              {/* <TouchableOpacity onPress={onResendCode}>
                <View style={style.buttonRefreshOTP}>
                  <RefreshIcon width={24} height={24} fill={'grey'} />
                  <Text style={style.textRefreshOTP}>Gửi lại mã OTP</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
        <KeyboardAvoidingView behavior={'position'}>
          <TouchableOpacity onPress={onSignIn} style={style.buttonSignUp}>
            {isLoading ? (
              <Lottie
                style={style.lottie}
                autoPlay
                source={require('../../../../assets/lotties/loading.json')}
              />
            ) : (
              <Text style={style.textSignUp}>Tiếp tục</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Button
          onPress={() => NavigationService.goBack()}
          textStyle={{fontWeight: '400'}}
          style={style.buttonSignIn}>
          Bạn đã có tài khoản ?{' '}
          <Text style={{fontWeight: 'bold'}}>Đăng nhập ngay</Text>{' '}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyPhoneNumberScreen;
