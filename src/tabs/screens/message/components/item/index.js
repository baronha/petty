import React from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import style from './style';
import Image from 'react-native-fast-image';
import NavigationService from '../../../../../navigators/NavigationService';
import moment from 'moment';
import localization from 'moment/locale/vi';

const MessageItem = ({item, dataUser}) => {
  const theme = useTheme();
  const onChatDetail = () => {
    NavigationService.navigate('ChatScreen', {
      friendInfo: item.user,
      dataUser: dataUser,
    });
  };

  const isRequest =
    item.last_message?.image && item.last_message?.body ? true : false;

  return (
    <TouchableOpacity
      style={{
        marginTop: 24,
      }}
      onPress={onChatDetail}>
      <Layout style={[style.container, {}]}>
        <Image
          style={style.avatar}
          source={{
            uri:
              item?.user?.avatar ||
              'https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/system_images%2Fplaceholder.png?alt=media&token=b7790dad-42da-4e58-9b31-dd2b77872b68',
          }}
        />
        <Layout style={style.contain}>
          <Layout
            style={[
              style.row,
              {
                marginBottom: 2,
              },
            ]}>
            <Text numberOfLines={1} style={style.name}>
              {item.user.user_name}
            </Text>
            <Text style={style.date}>
              {moment(item.last_act)
                .utcOffset('+0700')
                .locale('vi', localization)
                .fromNow()}
            </Text>
          </Layout>
          <Layout
            style={[
              style.row,
              {
                marginTop: 2,
              },
            ]}>
            <Text
              numberOfLines={1}
              style={[
                style.message,
                {
                  fontWeight:
                    (!item.read &&
                      item.last_message.from !== dataUser.doc_id) ||
                    isRequest
                      ? '600'
                      : '400',
                  color: isRequest ? '#FDBF50' : theme['text-basic-color'],
                },
              ]}>
              {item.last_message.from === dataUser.doc_id && 'Bạn: '}
              {isRequest
                ? '🐶 Yêu cầu nhận nuôi'
                : item.last_message.image
                ? '🌄 Hình ảnh'
                : item.last_message.body}
            </Text>
            {!item.read && item.last_message.from !== dataUser.doc_id && (
              <Layout style={style.dotSeen} />
            )}
          </Layout>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

export default MessageItem;
