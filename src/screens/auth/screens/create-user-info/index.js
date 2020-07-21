import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import style from './style';
import {
  Header,
  AddressModal,
  AlertHelper,
  LoadingButton,
} from '../../../../components';
import {CameraFillIcon} from '../../../../utils/icon';
import {Input, useTheme, Button} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {validateUserName} from '../../../../utils/helpers';
import NavigationService from '../../../../navigators/NavigationService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateProfie, login} from '../../actions';
import {UPDATE_PROFILE_SUCCESS} from '../../utils/type';

const CreateUserInfo = ({route, actions, type}) => {
  const theme = useTheme();
  const {docId, password} = route.params;
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState({});
  const [visibleAddress, setVisibleAddress] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useMemo(() => {
    if (type === UPDATE_PROFILE_SUCCESS) {
      actions.login(userName, password);
      setLoading(false);
    }
  }, [type]);

  const onPickAvatar = () => {
    ImagePicker.openPicker({
      cropping: true,
      useFrontCamera: true,
      includeExif: true,
      forceJpg: true,
    }).then(image => {
      setAvatar(image.path);
    });
  };

  const onSetAddress = value => {
    setAddress(value);
    setVisibleAddress(false);
  };

  const complete = () => {
    let user = {
      doc_id: docId,
      address,
      user_name: userName,
      avatar: `https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/avatars%2F${docId}?alt=media`,
      name,
    };
    actions.updateProfie(user);
  };

  const handleComplete = () => {
    if (avatar !== '') {
      storage()
        .ref('avatars/' + docId)
        .putFile(avatar)
        .then(file => {
          complete();
        })
        .catch(error => console.log(error));
    } else {
      complete();
    }
  };
  
  const hidekeyboard = () =>{
    Keyboard.dismiss()
  }

  const onComplete = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let error = '';
    if (name !== '') {
      if (userName !== '') {
        if (userName.length >= 6) {
          if (validateUserName(userName)) {
            await firestore()
              .collection('users')
              .where('user_name', '==', userName)
              .get()
              .then(querySnapshot => {
                if (!querySnapshot.empty) {
                  error = 'Tên đăng nhập đã tồn tại';
                } else {
                  if (Object.entries(address).length !== 0) {
                    if (avatar !== '') {
                      handleComplete();
                    } else {
                      Alert.alert(
                        'Cảnh báo',
                        'Bạn chưa cài đặt hình đại diện',
                        [
                          {
                            text: 'Cài liền',
                            onPress: () => {
                              onPickAvatar();
                              setLoading(false);
                            },
                          },
                          {
                            text: 'Để sau',
                            onPress: handleComplete,
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      );
                    }
                  } else {
                    error = 'Địa chỉ không được để trống';
                  }
                }
              })
              .catch(error => console.log(error));
          } else {
            error = 'Tên đăng nhập không đúng định dạng';
          }
        } else {
          error = 'Tên đăng nhập phải hơn 6 ký tự';
        }
      } else {
        error = 'Tên đăng nhập không được để trống';
      }
    } else {
      error = 'Họ và tên không được để trống';
    }
    if (error !== '') {
      AlertHelper.show('error', 'Lỗi', error);
      setLoading(false);
    }
  };

  const toggleAddress = () => {
    setVisibleAddress(true);
    hidekeyboard();
  };

  const dismissAddress = () => {
    setVisibleAddress(false);
  };

  return (
    <TouchableWithoutFeedback onPress={hidekeyboard}>
      <View style={style.container}>
        <Header />
        <View style={style.view}>
          <View style={style.backgroundImage}>
            <TouchableWithoutFeedback onPress={onPickAvatar}>
              <View style={style.buttonAvatar}>
                {avatar === '' ? (
                  <CameraFillIcon width={32} height={32} fill={'black'} />
                ) : (
                  <View style={style.avatarView}>
                    <Image style={style.avatar} source={{uri: avatar}} />
                    <View style={style.overlay}>
                      <CameraFillIcon width={32} height={32} fill={'white'} />
                    </View>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Input
            value={name}
            onChangeText={setName}
            label={'Họ và tên'}
            labelStyle={{
              color: 'black',
            }}
            autoCorrect={false}
            textStyle={{fontWeight: '600', color: 'black'}}
            style={[
              style.input,
              {
                backgroundColor: theme['color-basic-300'],
              },
            ]}
          />
          <Input
            value={userName}
            onChangeText={setUserName}
            autoCapitalize={'none'}
            label={'Tên đăng nhập'}
            labelStyle={{
              color: 'black',
            }}
            autoCorrect={false}
            textStyle={{fontWeight: '600', color: 'black'}}
            style={[
              style.input,
              {
                backgroundColor: theme['color-basic-300'],
              },
            ]}
          />
          <Text style={style.labelInput}>Địa chỉ</Text>
          <TouchableWithoutFeedback onPress={toggleAddress}>
            <View
              style={[
                style.inputAdress,
                {
                  backgroundColor: theme['color-basic-300'],
                },
              ]}>
              <Text numberOfLines={1} style={style.address}>
                {Object.entries(address).length !== 0 && address.address}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Modal
          isVisible={visibleAddress}
          transparent={false}
          style={{margin: 0, backgroundColor: 'white'}}
          onDismiss={dismissAddress}
          animationType={'slide'}
          presentationStyle={'pageSheet'}>
          <AddressModal
            address={address}
            getAddress={onSetAddress}
            onClose={dismissAddress}
          />
        </Modal>
        <LoadingButton
          onPress={onComplete}
          isLoading={isLoading}
          title={'Hoàn tất'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => ({
  type: state.userApi.type,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateProfie, login}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUserInfo);
