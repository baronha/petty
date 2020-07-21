import React, {useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import style from './style';
import {Button} from '@ui-kitten/components';
import NavigationService from '../../../../navigators/NavigationService';
import {bindActionCreators} from 'redux';
import {updateProfie, login} from '../../actions';
import {connect} from 'react-redux';
import {UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILED} from '../../utils/type';
import {LoadingButton} from '../../../../components';

const IntroAppScreen = ({route, actions, type}) => {
  let {userInfo} = route.params;
  const [isNewUser, setOldUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useMemo(() => {
    if (type === UPDATE_PROFILE_SUCCESS && !isNewUser) {
      NavigationService.navigate('Main');
      setLoading(false);
    } else if (type === UPDATE_PROFILE_FAILED) {
      setLoading(false);
    }
  }, [type]);

  const onStart = () => {
    console.log(userInfo)
    let user = {...userInfo};
    user.is_new_user = false;
    setOldUser(false);
    actions.updateProfie(user);
    setLoading(true);
  };

  return (
    <View style={style.container}>
      <Lottie
        source={require('../../../../assets/lotties/app-intro.json')}
        style={style.lottie}
        autoPlay={true}
        loop
      />
      <View style={style.bottom}>
        <Text style={style.hiText}>Xin Chào {userInfo?.name} !</Text>
        <Text style={style.titleMain}>
          Đây có vẻ là lần đầu bạn đến với
          <Text style={{fontWeight: 'bold'}}> Petty</Text>
          {'\n'}
          Chúng tôi mong bạn sẽ có những trải nghiệm tuyệt vời cùng với
          <Text style={{fontWeight: 'bold'}}> Petty</Text>
        </Text>
        <LoadingButton
          onPress={onStart}
          isLoading={isLoading}
          title={'Bắt đầu thôi'}
          style={{marginHorizontal: 0}}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  type: state.userApi.type,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateProfie}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntroAppScreen);
