import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View, Alert} from 'react-native';
import {Layout, Text, Button, useTheme, Icon} from '@ui-kitten/components';
import style from './style';
import {Header, LoadingButton, AlertHelper} from '../../components';
import {getAdoptDetail} from './api';
import moment from 'moment';
import {Uploader} from '../pet-detail/components';
import firestore from '@react-native-firebase/firestore';
import {onSend} from '../chat/actions';
import NavigationService from '../../navigators/NavigationService';

const ICON_SIZE = 24;

const RequestAdoptDetailScreen = ({route}) => {
  const theme = useTheme();
  const {petId, userId, subjectId, dataUser, friendInfo} = route.params;
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getDataAdoptRequest();
  }, []);

  const getDataAdoptRequest = async () => {
    const result = await getAdoptDetail(petId);
    if (result.exists) {
      setData(result.data()[userId]);
    }
  };

  const infoRow = (title, iconName) => {
    return (
      <View style={[style.row, style.infoRow]}>
        <Icon
          name={iconName}
          width={ICON_SIZE}
          height={ICON_SIZE}
          fill={theme['text-basic-color']}
        />
        <Text style={style.titleInfo}>{title}</Text>
      </View>
    );
  };

  const showAlertConfirm = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có xác nhận cho thú cưng hay không ?',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {text: 'Đồng ý', onPress: accept},
      ],
      {cancelable: false},
    );
  };

  const showAlertCalcel = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn xác nhận không gửi thú cưng cho  ${data.user.name}?`,
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {text: 'Đúng vậy', onPress: cancel},
      ],
      {cancelable: false},
    );
  };

  const cancel = () => {
    onSend(
      `#reply\nTôi không đồng ý trao ${data.pet.name} cho bạn. Xin lỗi nha`,
      subjectId,
      dataUser,
      friendInfo,
    );
  };

  const accept = () => {
    setLoading(true);
    let petInfo = {...data.pet};
    petInfo.uploader = data.user;
    petInfo.is_adopted = true;
    firestore()
      .collection('pets')
      .doc(data.pet.id)
      .update(petInfo)
      .then(() => {
        onSend(
          `#reply\nTôi đồng ý trao ${data.pet.name} cho bạn. Nhớ chăm sóc ${
            data.pet.name
          } tốt nhất có thể bạn nhé `,
          subjectId,
          dataUser,
          friendInfo,
        );
        AlertHelper.show(
          'success',
          'Thành công',
          `Bạn đã xác nhận gửi ${
            data.pet.name
          } về ngôi nhà mới. Đội ngũ Petty trân trọng cảm ơn`,
        );
        setLoading(false);
        NavigationService.goBack();
      })
      .catch(error => {
        console.log(error);
        AlertHelper.show('error', 'Lỗi', 'Đã có lỗi xảy ra');
      });
  };

  return (
    <Layout style={style.container}>
      <Header title={''} />
      <ScrollView
        style={style.scroll}
        contentContainerStyle={{paddingBottom: 24}}>
        <Text style={style.titleMain}>{data?.pet?.name}</Text>
        <Layout level={'2'} style={style.image}>
          <Image style={style.image} source={{uri: data?.pet?.images[0]}} />
        </Layout>
        <Text style={style.title}>Nội dung yêu cầu</Text>
        <Layout level={'2'} style={style.bodyRequest}>
          <Text style={style.bodyRequestText}>{data?.body}</Text>
          <Text style={style.time}>{moment(data?.time).fromNow()}</Text>
        </Layout>
        <Text style={style.title}>Thông tin người gửi</Text>
        <View style={style.infoMain}>
          <Uploader dataUser={data?.pet?.uploader} uploader={data?.user} />
        </View>
        <Layout level={'2'} style={style.infoDetail}>
          {infoRow(
            `${data?.user?.address?.ward}, ${data?.user?.address?.district}, ${
              data?.user?.address?.province
            } `,
            'pin-outline',
          )}
          {infoRow(`${data?.user?.phone_number} `, 'phone-outline')}
          {infoRow(`${data?.user?.email} `, 'email-outline')}
        </Layout>
      </ScrollView>
      <Layout
        style={[
          style.bottomGroup,
          style.row,
          {
            backgroundColor: theme['background-basic-tabbar'],
          },
        ]}>
        <Button onPress={showAlertCalcel} style={style.buttonCancel}>
          Huỷ
        </Button>
        <LoadingButton
          style={style.buttonAccept}
          title={'Chấp nhận'}
          onPress={showAlertConfirm}
          isLoading={isLoading}
        />
      </Layout>
    </Layout>
  );
};

export default RequestAdoptDetailScreen;
