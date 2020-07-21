import React, {useState} from 'react';
import {
  Layout,
  Text,
  useTheme,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import style from './style';
import {Image2Icon} from '../../../../utils/icon';

const ChatInput = ({onSend, openImagePicker}) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');

  const onSendText = () => {
    if (message.length === 0) {
      Alert.alert('Bạn chưa nhập tin nhắn');
    } else {
      onSend(message);
      setMessage('');
    }
  };

  const onChangeText = value => {
    setMessage(value);
  };

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <Layout
        style={[
          style.container,
          {
            backgroundColor: theme['background-basic-tabbar'],
          },
        ]}>
        <Layout level={'3'} style={style.inputView}>
          <TextInput
            style={[
              style.textInput,
              {
                color: theme['text-basic-color'],
              },
            ]}
            autoCorrect={false}
            placeholderTextColor={theme['text-hint-color']}
            placeholder={'Nhập tin nhắn...'}
            onChangeText={onChangeText}
            value={message}
          />
          <TopNavigationAction
            icon={Image2Icon}
            style={style.imageView}
            onPress={openImagePicker}
          />
        </Layout>
        <TouchableOpacity onPress={onSendText} style={style.buttonSend}>
          <Text
            style={[
              style.textSend,
              {
                color: message !== '' ? '#FDBF50' : theme['text-basic-color'],
              },
            ]}>
            Gửi
          </Text>
        </TouchableOpacity>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;
