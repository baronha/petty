import React, {useState, useMemo} from 'react';
import {Text, TextInput, Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {login} from '../../../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AlertHelper, LoadingButton} from '../../../../../../components';
import {validateUserName} from '../../../../../../utils/helpers';
import {LOG_IN_FAILED} from '../../../../utils/type';
import {Input} from '@ui-kitten/components'

const FacebookIcon = () => {
  return (
    <Image
      source={require('../../../../../../assets/images/facebook-icon/facebook-icon.png')}
      style={style.facebookIcon}
    />
  );
};

const LoginForm = ({actions, type}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  useMemo(() => {
    if (type === LOG_IN_FAILED) {
      setLoading(false);
    }
  }, [type]);

  const onLogin = () => {
    setLoading(true);
    let error = '';
    if (userName !== '') {
      if (password !== '') {
        if (validateUserName(userName)) {
          actions.login(userName, password);
        } else {
          error = 'Tên đăng nhập không đúng định dạng';
        }
      } else {
        error = 'Mật khẩu không được để trống';
      }
    } else {
      error = 'Tên đăng nhập  không được để trống';
    }
    if (error !== '') {
      setLoading(false);
      AlertHelper.show('error', 'Lỗi', error);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.inputView}>
        <Text style={style.label}>Tên đăng nhập</Text>
        <Input
          placeholder={'Petty'}
          autoCorrect={false}
          style={style.input}
          onChangeText={setUserName}
          autoCapitalize={'none'}
          textStyle={style.textInput}
        />
        <View style={style.passwordView}>
          <Text style={style.label}>Mật khẩu</Text>
          <Input
            placeholder={'• • • • • • • • •'}
            onChangeText={setPassword}
            autoCorrect={false}
            style={style.input}
            secureTextEntry={true}
            textStyle={style.textInput}
          />
        </View>
      </View>
      <View style={style.buttonGroup}>
        <View style={style.loginButton}>
          <LoadingButton
            style={{margin: 0}}
            title={'Đăng nhập'}
            onPress={onLogin}
            isLoading={isLoading}
          />
        </View>
        <TouchableOpacity style={style.buttonFacebook}>
          <FacebookIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({login}, dispatch),
});

const mapStateToProps = state => ({
  type: state.userApi.type,
  dataLogin: state.userApi.dataLogin,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
