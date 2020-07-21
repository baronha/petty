import React, {useState} from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import {
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import style from './style';
import CommentItem from '../comment-item';
import {SafeAreaLayout} from '../../../../components/safe-area-layout';
import {useSafeArea} from 'react-native-safe-area-context';

const CommentModal = ({data, onCloseModal, onSend}) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const insets = useSafeArea();

  const onChangeText = value => {
    setText(value);
  };

  const onSendText = () => {
    onSend(text);
    setText('');
  };

  return (
    <Layout
      style={[
        style.container,
        {
          height: Dimensions.get('window').height - (insets.top + 60),
        },
      ]}>
      <Layout
        style={[
          style.header,
          {
            backgroundColor: theme['background-basic-tabbar'],
            borderColor: theme['background-basic-color-3'],
          },
        ]}>
        <Layout style={style.buttonClose} />
        <Text style={style.headerTitle}>Bình luận</Text>
        <TouchableOpacity
          onPress={onCloseModal}
          style={[
            style.buttonClose,
            {
              backgroundColor: theme['text-basic-color'] + '16',
            },
          ]}>
          <Text style={style.textClose}>Đóng</Text>
        </TouchableOpacity>
      </Layout>
      <FlatList
        inverted
        data={data}
        extraData={data}
        style={{flex: 1}}
        initialNumToRender={50}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingVertical: 12}}
        renderItem={({item, index}) => {
          return <CommentItem key={index} item={item} index={index} />;
        }}
        keyExtractor={item => item.id}
      />
      <KeyboardAvoidingView keyboardVerticalOffset={118} behavior={'padding'}>
        <Layout
          style={[
            style.bottom,
            {
              backgroundColor: theme['background-basic-tabbar'],
              borderColor: theme['background-basic-color-3'],
            },
          ]}>
          <Layout style={style.inputView} level={'3'}>
            <TextInput
              placeholder={'Nhập bình luận ...'}
              value={text}
              onChangeText={onChangeText}
              multiline
              autoCorrect={false}
              style={[
                {
                  color: theme['text-basic-color'],
                },
              ]}
              placeholderTextColor={theme['text-hint-color']}
            />
          </Layout>
          <TouchableOpacity
            onPress={onSendText}
            disabled={text === '' ? true : false}
            style={style.buttonSend}>
            <Text
              style={[
                style.textSend,
                {
                  color: text !== '' ? '#FDBF50' : 'grey',
                },
              ]}>
              Gửi
            </Text>
          </TouchableOpacity>
        </Layout>
      </KeyboardAvoidingView>
      <SafeAreaLayout insets={'bottom'} />
    </Layout>
  );
};

export default CommentModal;
