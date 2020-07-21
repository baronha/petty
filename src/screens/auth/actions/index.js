import {
  SIGN_UP_BY_VERTIFICATION_CODE_SUCCESS,
  ERROR_SIGN_UP,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  UPDATE_PROFILE_FAILED,
} from '../utils/type';
import firestore from '@react-native-firebase/firestore';
import {AlertHelper} from '../../../components';
import NavigationService from '../../../navigators/NavigationService';
import {saveAddress} from '../../../utils/helpers';
import AsyncStorage from '@react-native-community/async-storage';

export const signUp = userInfo => dispatch => {};

export const login = (userName, password) => dispatch => {
  dispatch({
    type: LOADING,
  });
  firestore()
    .collection('users')
    .where('user_name', '==', userName)
    .where('password', '==', password)
    .get()
    .then(async querySnapshot => {
      if (!querySnapshot.empty) {
        const dataLogin = querySnapshot.docs[0].data();
        try {
          await AsyncStorage.setItem(
            'petty.userInfo',
            JSON.stringify(dataLogin),
          ).then(() => {
            dispatch({
              type: LOG_IN_SUCCESS,
              payload: dataLogin,
            });
            if (dataLogin.is_new_user) {
              NavigationService.navigate('IntroAppScreen', {
                userInfo: dataLogin,
              });
            } else {
              NavigationService.navigate('Main');
              AlertHelper.show(
                'success',
                'Xin Chào ' + dataLogin.name,
                'Bạn đã đăng nhập thành công',
              );
            }
          });
        } catch (e) {
          console.log(e);
        }
        await saveAddress(dataLogin.address);
      } else {
        AlertHelper.show(
          'error',
          'Lỗi',
          'Tên đăng nhập hoặc mật khẩu không chính xác',
        );
        dispatch({
          type: LOG_IN_FAILED,
        });
      }
    });
};

export const updateProfie = userInfo => dispatch => {
  dispatch({
    type: LOADING,
  });
  console.log(userInfo)
  firestore()
    .collection('users')
    .doc(userInfo.doc_id)
    .update(userInfo)
    .then(result => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: UPDATE_PROFILE_FAILED,
      });
      AlertHelper.show('error', 'Lỗi', 'Đã có lỗi xảy ra');
    });
};
