import React, {useState} from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import style from './style';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import NavigationService from '../../../../navigators/NavigationService';

const CommentInput = ({dataUser, onSend}) => {
  const [text, setText] = useState('');
  const theme = useTheme();
  const onChangeText = value => {
    setText(value);
  };

  const onTouch = () => {
    if (Object.entries(dataUser).length === 0) {
      NavigationService.navigate('GeneralAuthScreen');
    }
  };

  const onSendComment = () => {
    onSend(text);
    setText('');
  };

  return (
    <Layout style={style.container}>
      <Image
        style={style.avatarInput}
        defaultSource={require('../../../../assets/images/placeholder/placeholder.png')}
        source={{
          uri:
            dataUser.avatar ||
            'https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/system_images%2Fplaceholder.png?alt=media&token=b7790dad-42da-4e58-9b31-dd2b77872b68',
        }}
      />
      <Layout style={style.inputView}>
        <Layout level={'3'} style={style.input}>
          <TextInput
            onTouchStart={onTouch}
            editable={Object.entries(dataUser).length !== 0 ? true : false}
            placeholder={'Nhập bình luận...'}
            placeholderTextColor={theme['text-hint-color']}
            style={{
              color: theme['text-basic-color'],
              lineHeight: 18,
            }}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
            autoCorrect={false}
          />
        </Layout>
        {text !== '' && (
          <Layout>
            <TouchableOpacity onPress={onSendComment}>
              <Text style={style.textSend}>Gửi</Text>
            </TouchableOpacity>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

export default CommentInput;
