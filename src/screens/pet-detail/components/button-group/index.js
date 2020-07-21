import React, {useState, useEffect} from 'react';
import {Layout, useTheme, Button} from '@ui-kitten/components';
import {
  TextInput,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import style from './style';
import {useSafeArea} from 'react-native-safe-area-context';
import {CloseIcon} from '../../../../utils/icon';
import {LoadingButton} from '../../../../components';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {onSend} from '../../../chat/actions';
import Lottie from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {HeartIcon, HeartOutlineIcon} from '../../../../utils/icon';
import Modal from 'react-native-modal';
import moment from 'moment';
import NavigationService from '../../../../navigators/NavigationService';
import {getAdopt} from '../../api';

const {width, height} = Dimensions.get('window');
const initHeight = height - (width - 24);

const ButtonGroup = ({onLike, like, data, dataUser}) => {
  const [text, setText] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const theme = useTheme();
  const [heightAnim] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const [visibleModalAdopt, setVisibleModalAdopt] = useState(false);
  const [emptyAdopt, setEmptyAdopt] = useState(true);
  const [totalAdopt, setTotalAdopt] = useState(0);

  useEffect(() => {
    Animated.spring(heightAnim, {
      toValue: isFocus ? -(height - (initHeight + insets.top + 48)) : 0,
    }).start();
  }, [isFocus]);

  const validateAuth = () => {
    if (Object.entries(dataUser).length !== 0) {
      return true;
    } else {
      NavigationService.navigate('GeneralAuthScreen');
    }
  };

  useEffect(() => {
    firestore()
      .collection('contacts')
      .doc(dataUser.doc_id)
      .get()
      .then(result => {
        const dataSnapshot = result.data();
        const contactId = data.uploader.doc_id;
        const contactInfo = dataSnapshot[contactId];
        let subId = '';
        if (contactInfo !== undefined) {
          subId = contactInfo.id;
        } else {
          subId = uuid.v4();
        }
        setSubjectId(subId);
        setLoading(false);
      });
    getDataAdopt();
  }, []);

  const getDataAdopt = async () => {
    const result = await getAdopt(data.id);
    const adopt = result.data();
    if (result.exists) {
      if (adopt[dataUser.doc_id] !== undefined) {
        setSent(true);
      }
      setEmptyAdopt(false);
      setTotalAdopt(Object.keys(adopt).length);
    }
  };

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        onDismissAdoptModal();
      }, 1000);
    }
    clearTimeout();
  }, [sent]);

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const onChangeText = value => {
    setText(value);
  };

  const onDismisKeyboard = () => {
    Keyboard.dismiss();
  };

  const onAdopt = () => {
    const adopt = {
      pet: data,
      user: dataUser,
      body: text,
      time: moment().format(),
    };
    let alert = '';
    if (text === '') alert = 'Lời nhắn không được để trống';
    if (text.length < 10) alert = 'Lời nhắn có vẻ quá ngắn';
    if (alert !== '') {
      Alert.alert(alert);
    } else {
      // empty adopt check list adopt is null || 0 || undefined;
      // if adoptList is exist
      if (emptyAdopt === false) {
        firestore()
          .collection('adoptions')
          .doc(data.id)
          .update({[dataUser.doc_id]: adopt});
      } else {
        firestore()
          .collection('adoptions')
          .doc(data.id)
          .set({[dataUser.doc_id]: adopt});
      }
      onSend(text, subjectId, dataUser, data.uploader, data.images[0], data.id);
      setSent(true);
    }
  };

  const gotoChat = () => {
    NavigationService.navigate('ChatScreen', {
      friendInfo: data.uploader,
      dataUser: dataUser,
    });
  };

  const onVisibleAdoptModal = () => {
    if (validateAuth()) {
      if (sent) {
        Alert.alert(
          'Thông báo',
          `Bạn đã gửi yêu cầu nhận nuôi ${data.name}.
           Bạn có muốn liên lạc với người chủ quản của ${data.name} không?`,
          [
            {
              text: 'Không',
              style: 'cancel',
            },
            {text: 'Có', onPress: gotoChat},
          ],
          {cancelable: false},
        );
      } else {
        setVisibleModalAdopt(true);
      }
    }
  };

  const onDismissAdoptModal = () => {
    setVisibleModalAdopt(false);
    setFocus(false);
  };

  const goEdit = () => {};

  const onViewList = () => {};

  const handleOnLike = () => {
    if (validateAuth()) {
      onLike();
    }
  };

  return dataUser.doc_id === data.uploader.doc_id ? (
    <Layout
      style={[
        style.container,
        {
          backgroundColor: theme['background-basic-tabbar'],
        },
      ]}>
      <Layout>
        <Button onPress={onViewList}>Danh sách yêu cầu</Button>
        <Animatable.View style={style.badge}>
          <Text style={style.textBadge}>{totalAdopt}</Text>
        </Animatable.View>
      </Layout>
      <Button style={style.buttonEdit} onPress={goEdit}>
        Chỉnh sửa
      </Button>
    </Layout>
  ) : (
    <Layout
      style={[
        style.container,
        {
          backgroundColor: theme['background-basic-tabbar'],
        },
      ]}>
      <Button
        onPress={handleOnLike}
        style={style.likeButton}
        icon={like ? HeartIcon : HeartOutlineIcon}
      />
      <Button
        onPress={onVisibleAdoptModal}
        disabled={data?.is_adopted ? true : false}
        style={style.adoptButton}>
        {data?.is_adopted
          ? 'Đã được nhận nuôi'
          : sent
          ? 'Đã gửi yêu cầu'
          : 'Nhận nuôi'}
      </Button>
      <Modal
        isVisible={visibleModalAdopt}
        onSwipeComplete={onDismissAdoptModal}
        style={style.modal}
        propagateSwipe={true}
        onBackdropPress={onDismissAdoptModal}>
        <TouchableWithoutFeedback onPress={onDismisKeyboard}>
          <Animated.View
            style={[
              style.containerModal,
              {
                backgroundColor: theme['background-basic-color-1'],
                transform: [{translateY: heightAnim}],
              },
            ]}>
            <Layout style={{flex: 1}}>
              <Layout style={style.titleView}>
                <Text
                  style={[
                    style.title,
                    {
                      color: theme['text-basic-color'],
                    },
                  ]}>
                  Nhận nuôi
                </Text>
                <TouchableWithoutFeedback onPress={onDismissAdoptModal}>
                  <Layout level={'2'} style={style.iconView}>
                    <CloseIcon
                      width={20}
                      height={20}
                      fill={theme['text-basic-color']}
                    />
                  </Layout>
                </TouchableWithoutFeedback>
              </Layout>
              <TextInput
                placeholder={`Tại sao bạn lại muốn nhận nuôi ${data.name}\n`}
                numberOfLines={2}
                placeholderTextColor={theme['text-hint-color']}
                multiline
                autoCorrect={false}
                onFocus={onFocus}
                onBlur={onBlur}
                value={text}
                onChangeText={onChangeText}
                style={[
                  style.textInput,
                  {
                    backgroundColor: theme['background-basic-color-2'],
                    color: theme['text-basic-color'],
                  },
                ]}
              />
              <Text
                style={[
                  style.notice,
                  {
                    color: theme['text-hint-color'],
                  },
                ]}>
                Lưu ý: Những dòng tin nhắn của bạn sẽ giúp tăng cơ hội được chủ
                nhân của thú cưng đặt niềm tin nơi bạn . Vì vậy hãy có trách
                nhiệm với những dòng tin nhắn này
              </Text>
            </Layout>
            <KeyboardAvoidingView behavior={'position'} style={style.bottom}>
              <LoadingButton
                style={{margin: 0}}
                title={'Nhận nuôi'}
                onPress={onAdopt}
                isLoading={isLoading}
              />
            </KeyboardAvoidingView>
            {sent && (
              <Layout style={style.overlaySent}>
                <Animatable.View
                  animation={'rubberBand'}
                  style={[
                    style.lottieView,
                    {
                      backgroundColor: theme['background-basic-color-2'],
                    },
                  ]}>
                  <Lottie
                    style={style.lottie}
                    autoPlay
                    source={require('../../../../assets/lotties/clap.json')}
                  />
                  <Text
                    style={[
                      style.textSent,
                      {
                        color: theme['text-basic-color'],
                      },
                    ]}>
                    Đã gửi
                  </Text>
                </Animatable.View>
              </Layout>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </Layout>
  );
};

export default ButtonGroup;
