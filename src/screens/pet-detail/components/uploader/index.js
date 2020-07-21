import React, {useState, useMemo, useCallback} from 'react';
import {Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import style from './style';
import {TouchableOpacity, Animated, Image, Linking} from 'react-native';
import {
  MessageCircleOutlineIcon,
  PhoneOutlineIcon,
  CloseIcon,
} from '../../../../utils/icon';
import NavigationService from '../../../../navigators/NavigationService';

const Uploader = ({uploader, dataUser}) => {
  const [translateX] = useState(new Animated.Value(0));
  const [isShowContact, setShowContact] = useState(false);

  useMemo(() => {
    Animated.spring(translateX, {
      toValue: isShowContact ? -200 : 0,
    }).start();
  }, [isShowContact]);

  const onContact = () => {
    setShowContact(!isShowContact);
  };

  const goChat = () => {
    NavigationService.push('ChatScreen', {
      friendInfo: uploader,
      dataUser: dataUser,
    });
  };

  const onCall = () => {
    Linking.openURL(uploader.phone_number);
  };

  return (
    <Layout style={style.container}>
      <Layout level={'3'} style={style.buttonGroup}>
        <TopNavigationAction
          style={style.buttonContact}
          icon={MessageCircleOutlineIcon}
          onPress={goChat}
        />
        <Layout level={'4'} style={[style.buttonContact]}>
          <TopNavigationAction onPress={onCall} icon={PhoneOutlineIcon} />
        </Layout>
      </Layout>
      <Animated.View
        style={[
          style.uploaderCard,
          {
            transform: [{translateX}],
          },
        ]}>
        <Layout style={style.infoUploader}>
          <Image
            source={{
              uri:
                uploader?.avatar ??
                'https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/system_images%2Fplaceholder.png?alt=media',
            }}
            style={style.avatar}
            resizeMode={uploader?.avatar === null ? 'contain' : 'center'}
          />
          <Layout style={style.infoText}>
            <Text style={style.name}>{uploader?.name}</Text>
            <Text style={style.userName}>{uploader?.user_name}</Text>
          </Layout>
        </Layout>
        <TouchableOpacity onPress={onContact}>
          {isShowContact ? (
            <CloseIcon width={24} height={24} fill={'#FD5E5A'} />
          ) : (
            <Text style={style.textContact}>Liên hệ</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </Layout>
  );
};

export default Uploader;
