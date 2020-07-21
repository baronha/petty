import React, {useState, useEffect} from 'react';
import {Layout, useTheme, Spinner, Text, Button} from '@ui-kitten/components';
import style from './style';
import {Header, ChatInput, WaveView} from './components';
import {SafeAreaLayout} from '../../components/safe-area-layout';
import {GiftedChat, Bubble, MessageText} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import 'moment';
import 'moment/locale/vi';
import {onSend} from './actions';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Linking, Dimensions, TouchableOpacity, View} from 'react-native';
import NavigationService from '../../navigators/NavigationService';

const {width} = Dimensions.get('window');

const ChatScreen = ({route}) => {
  const {friendInfo, dataUser} = route.params;
  const chatId = route.params?.chatId;
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    if (chatId !== undefined) {
      setSubjectId(chatId);
    } else {
      getContactInfo(dataUser.doc_id);
    }
  }, []);

  useEffect(() => {
    if (subjectId !== '') {
      const subscriber = database()
        .ref(`/messages/${subjectId}`)
        .on('value', snapshot => {
          if (snapshot) {
            const data = [];
            snapshot.forEach(item => {
              if (item !== undefined) {
                let message = Object.assign({}, item.val());
                message._id = item.key;
                data.unshift(message);
              }
            });
            setData(data);
            setLoading(false);
          }
        });
      return () => subscriber();
    }
  }, [subjectId]);

  const getContactInfo = userId => {
    firestore()
      .collection('contacts')
      .doc(userId)
      .get()
      .then(result => {
        const dataSnapshot = result.data();
        const contactId = friendInfo.doc_id;
        const contactInfo = dataSnapshot[contactId];
        if (contactInfo !== undefined) {
          setSubjectId(contactInfo.id);
          if (!contactInfo.read && contactInfo.last_message.from !== userId) {
            onRead(userId, friendInfo.doc_id, contactInfo);
          }
        } else {
          setLoading(false);
        }
      });
  };

  const onRead = (userId, friendId, contactInfo) => {
    contactInfo.read = true;
    firestore()
      .collection('contacts')
      .doc(userId)
      .update({[friendId]: contactInfo});
  };

  const onSendMessage = (value, image) => {
    let id = '';
    if (data.length === 0) {
      id = uuid.v4();
      setSubjectId(id);
    } else {
      id = subjectId;
    }
    if (id !== '') {
      onSend(value, id, dataUser, friendInfo, image);
    }
  };

  const onPickImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      useFrontCamera: true,
      includeExif: true,
      forceJpg: true,
    }).then(image => {
      storage()
        .ref()
        .child(`messages/${subjectId}/${image.filename}${image.creationDate}`)
        .putFile(image.path)
        .then(() => {
          const uri = `https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/messages%2F${subjectId}%2F${
            image.filename
          }${image.creationDate}?alt=media`;
          onSendMessage('', uri);
        })
        .catch(e => console.log(e));
    });
  };

  const renderBubble = props => {
    const isRequest =
      props.currentMessage.text && props.currentMessage.image ? true : false;
    const widthBubble = isRequest ? width / 2 : null;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: theme['background-basic-color-1'],
            width: widthBubble,
          },
          right: {
            backgroundColor: theme['color-primary-200'],
            width: widthBubble,
          },
        }}
        timeTextStyle={{
          left: {
            color: theme['text-basic-color'] + '64',
            height: 0,
          },
          right: {
            color: '#00000064',
            height: 0,
          },
        }}
      />
    );
  };

  const goDetail = item => {
    NavigationService.navigate('RequestAdoptDetailScreen', {
      petId: item.pet_id,
      userId: item.user._id,
      subjectId,
      dataUser,
      friendInfo,
    });
  };

  const renderMessageText = props => {
    const isRequest =
      props.currentMessage.text && props.currentMessage.image ? true : false;
    return (
      <View>
        <MessageText
          {...props}
          textStyle={{
            left: {
              color: theme['text-basic-color'],
              paddingTop: 4,
            },
            right: {
              color: '#000',
              paddingTop: 4,
            },
          }}
        />
        {isRequest && dataUser.doc_id !== props?.currentMessage?.user?._id && (
          <Button
            onPress={() => goDetail(props.currentMessage)}
            style={style.buttonDetail}>
            Xem chi tiết
          </Button>
        )}
      </View>
    );
  };

  const onCall = item => {
    Linking.openURL(item);
  };

  const onHashtag = value => {
    console.log(value);
  };

  const headerLightBox = close => {
    return (
      <Layout style={style.headerLightBox}>
        <SafeAreaLayout
          style={{backgroundColor: 'transparent'}}
          insets={'top'}
        />
        <TouchableOpacity onPress={close} style={style.buttonClose}>
          <Text style={style.textButtonClose}>Đóng</Text>
        </TouchableOpacity>
      </Layout>
    );
  };

  return (
    <Layout level={'2'} style={style.container}>
      <SafeAreaLayout insets={'top'} />
      <Header friendInfo={friendInfo} />
      {/* {data.length !== 0 ? (
        <WaveView friendInfo={friendInfo} />
      ) : ( */}
      {isLoading ? (
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner />
        </Layout>
      ) : (
        <GiftedChat
          renderChatEmpty={() => (
            <WaveView onSendWave={onSendMessage} friendInfo={friendInfo} />
          )}
          messages={data}
          renderInputToolbar={() => (
            <ChatInput openImagePicker={onPickImage} onSend={onSendMessage} />
          )}
          user={dataUser}
          bottomOffset={12}
          isLoadingEarlier
          locale={'vi'}
          dateFormat={'LL'}
          // renderDay={props => console.log(props)}
          timeTextStyle={{
            textTransform: 'capitalize',
          }}
          user={{
            _id: dataUser?.doc_id,
          }}
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          parsePatterns={linkStyle => [
            {type: 'phone', style: style.phone, onPress: onCall},
            {pattern: /#(\w+)/, style: style.hashtag, onPress: onHashtag},
          ]}
          imageStyle={style.image}
          lightboxProps={{renderHeader: headerLightBox}}
        />
      )}
      {/* )} */}
      {/* <ChatInput message={data} /> */}
      <SafeAreaLayout insets={'bottom'} />
    </Layout>
  );
};

export default ChatScreen;
