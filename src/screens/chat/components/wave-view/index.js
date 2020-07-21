import React from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import style from './style';
import * as Animatable from 'react-native-animatable';
import {Image, TouchableOpacity} from 'react-native';

const WaveView = ({friendInfo, onSendWave}) => {
  const onWave = () => {
    onSendWave('👋');
  };

  const theme = useTheme();
  return (
    <Layout style={style.container} level={'2'}>
      <Layout style={style.top} level={'2'}>
        <Image
          defaultSource={require('../../../../assets/images/placeholder/placeholder.png')}
          source={{
            uri:
              friendInfo.avatar ||
              'https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/system_images%2Fplaceholder.png?alt=media&token=b7790dad-42da-4e58-9b31-dd2b77872b68',
          }}
          style={[
            style.avatarWave,
            {
              borderColor: theme['background-basic-color-1'],
            },
          ]}
        />
        <Layout level={'2'} style={style.nameWaveView}>
          <Text style={style.nameWave}>{friendInfo.name}</Text>
          <Text style={style.userNameWave}>{friendInfo.user_name}</Text>
        </Layout>
      </Layout>
      <Layout level={'2'} style={style.bottom}>
        <TouchableOpacity onPress={onWave} style={style.iconWaveView}>
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            duration={1500}
            style={style.iconWave}>
            👋
          </Animatable.Text>
        </TouchableOpacity>
        <Text style={style.textWave}>Vẫy tay chào hỏi cái nà</Text>
      </Layout>
    </Layout>
  );
};

export default WaveView;
