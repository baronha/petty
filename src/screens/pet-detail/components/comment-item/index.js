import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Image from 'react-native-fast-image';
import style from './style';
import moment from 'moment';
import localization from 'moment/locale/vi';

const CommentItem = ({item, index}) => {
  return (
    <Layout style={style.container} key={index}>
      <Image
        source={{
          uri: item.user.avatar,
        }}
        style={style.avatar}
      />
      <Layout style={style.commentInfoMain}>
        <Text style={style.name}>
          {item.user.name}
          <Text style={style.time}>
            <Text> - </Text>
            {moment(item.time)
              .utcOffset('+0700')
              .locale('vi', localization)
              .fromNow()}
          </Text>
        </Text>
        <Layout level={'3'} style={style.commentInfo}>
          <Text style={style.commentText}>{item.content}</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CommentItem;
