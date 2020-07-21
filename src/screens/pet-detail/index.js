import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  Layout,
  Text,
  useTheme,
  TopNavigationAction,
} from '@ui-kitten/components';
import style from './style';
import {
  Animated,
  View,
  KeyboardAvoidingView,
  Image,
  Share,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  InfoArray,
  Uploader,
  ButtonGroup,
  ImageCarousel,
  CommentItem,
  CommentInput,
  CommentModal,
} from './components';
import {MapPinIcon, ShareIcon, HeartIcon} from '../../utils/icon';
import Lottie from 'lottie-react-native';
import {getUserInfo} from '../../utils/helpers';
import database from '@react-native-firebase/database';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import {getPetDetail} from './api';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {LOG_IN_SUCCESS} from '../auth/utils/type';
import NavigationService from '../../navigators/NavigationService';

const PetDetailScreen = ({route, typeLogin}) => {
  const theme = useTheme();
  const HEART_ICON = <HeartIcon width={120} height={120} fill={'white'} />;
  const HEART_BREAK_ICON = (
    <Image
      style={style.heartBreakImage}
      source={require('../../assets/images/heart-break/heart-break.png')}
    />
  );
  const {petId} = route.params;
  const [scrollY] = useState(new Animated.Value(0));
  const [backdrop] = useState(new Animated.Value(0));
  const [like, setLike] = useState(false);
  const [heartIcon, setHeartIcon] = useState(HEART_ICON);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [dataComment, setDataComment] = useState([]);
  const [total, setTotal] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  let scrollRef = useRef();

  useEffect(() => {
    getUserInfoData();
    getDataPet(petId);
    getComment();
  }, []);

  useEffect(() => {
    if (typeLogin === LOG_IN_SUCCESS) {
      getUserInfoData();
    }
  }, [typeLogin]);

  const getDataPet = async id => {
    const result = await getPetDetail(id);
    if (result) {
      result.onSnapshot(documentSnapshot => {
        const petData = documentSnapshot.data();
        setData(petData);
        setLoading(false);
      });
    } else {
      // setLoading(false)
    }
  };

  const getUserInfoData = async () => {
    const userInfo = await getUserInfo();
    if (userInfo !== null) {
      setDataUser(JSON.parse(userInfo));
    }
  };

  const getComment = () => {
    database()
      .ref('comments/' + petId)
      .on('value', snapshot => {
        if (snapshot) {
          const data = [];
          snapshot.forEach(item => {
            if (item !== undefined) {
              let comment = Object.assign({}, item.val());
              comment.id = item.key;
              data.unshift(comment);
            }
          });
          setDataComment(data);
          setTotal(snapshot._snapshot.childrenCount);
        }
      });
  };

  const onSendComment = value => {
    const comment = {
      content: value,
      time: moment().format(),
      user: {
        id: dataUser.doc_id,
        avatar: dataUser.avatar,
        name: dataUser.name,
        user_name: dataUser.user_name,
      },
    };
    database()
      .ref(`/comments/${petId}`)
      .push()
      .set(comment)
      .then(() => {});
  };

  const onLike = () => {
    // if (data.likes === undefined) {
    //   console.log(data);
    // } else {
    // }
    likeAnimated();
  };

  const likeAnimated = () => {
    setLike(!like);
    Animated.timing(backdrop, {
      toValue: 1,
    }).start(() => {
      Animated.timing(backdrop, {
        toValue: 0,
      }).start();
    });
    if (like) {
      setHeartIcon(HEART_BREAK_ICON);
    } else {
      setHeartIcon(HEART_ICON);
    }
  };

  const onShare = () => {
    Share.share({
      title: 'Chia sẻ',
      message: `${data.name}`,
    });
  };

  const toggleModalComment = () => {
    setVisibleModal(true);
  };

  const dismissModalComment = () => {
    setVisibleModal(false);
  };

  const ListComponentHeader = () => {
    return (
      <Layout>
        <ImageCarousel data={data.images} />
        <Layout style={style.content}>
          <Layout style={style.titleView}>
            <Layout>
              <Text style={style.title}>{data.name}</Text>
              <Text style={style.subTitle}>
                {data.is_adopted
                  ? 'Đã có chủ'
                  : data.has_owner
                  ? 'Tìm chủ mới'
                  : 'Bị bỏ rơi'}
              </Text>
            </Layout>
            <TopNavigationAction
              style={[
                style.shareIcon,
                {
                  backgroundColor: theme['background-basic-color-3'],
                },
              ]}
              onPress={onShare}
              icon={ShareIcon}
            />
          </Layout>
          <Layout style={[style.titleView, style.addressView]}>
            <TopNavigationAction icon={MapPinIcon} />
            <Text style={style.address}>{data.address.address}</Text>
          </Layout>
          <InfoArray data={data} />
          {data.is_adopted && <Text style={style.newOwner}>Chủ nhân mới</Text>}
          <Uploader dataUser={dataUser} uploader={data.uploader} />
          <Text style={style.summary}>{'    ' + data.summary}</Text>
          <Text style={style.titleComment}>Bình Luận ({total})</Text>
          <CommentInput onSend={onSendComment} dataUser={dataUser} />
        </Layout>
      </Layout>
    );
  };

  const ListComponentFooter = () => {
    return (
      total > 5 && (
        <Layout style={style.componentFooter}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              // theme['color-basic-transparent-100'],
              theme['background-basic-color-1'] + '32',
              theme['background-basic-color-1'] + '96',
              // theme['background-basic-color-1'] + '114',
              // theme['background-basic-color-1'],
              theme['background-basic-color-1'],
            ]}
            style={style.gradient}
          />
          <TouchableOpacity onPress={toggleModalComment} style={style.seeAll}>
            <Text style={style.textSeeAll}>Xem tất cả ({total})</Text>
          </TouchableOpacity>
        </Layout>
      )
    );
  };

  return (
    <Layout style={style.container}>
      <Layout style={style.container}>
        {isLoading ? (
          <Layout style={{flex: 1, justifyContent: 'center'}}>
            <Lottie
              style={style.lottie}
              loop
              autoPlay
              source={require('../../assets/lotties/dog.json')}
            />
          </Layout>
        ) : (
          <View style={{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={'position'}>
              <FlatList
                ref={ref => {
                  scrollRef = ref;
                }}
                data={dataComment}
                ListHeaderComponent={ListComponentHeader()}
                ListFooterComponent={ListComponentFooter()}
                contentContainerStyle={{paddingBottom: 120}}
                keyboardShouldPersistTaps={'handled'}
                initialNumToRender={5}
                renderItem={({item, index}) => {
                  if (index < 5) {
                    return (
                      <Animatable.View animation={'bounceIn'}>
                        <CommentItem
                          scrollRef={scrollRef}
                          key={item.id}
                          item={item}
                          index={index}
                        />
                      </Animatable.View>
                    );
                  }
                }}
                keyExtractor={item => item.id}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([
                  {nativeEvent: {contentOffset: {y: scrollY}}},
                ])}
              />
            </KeyboardAvoidingView>
            <ButtonGroup
              dataUser={dataUser}
              data={data}
              onLike={onLike}
              like={like}
            />
          </View>
        )}
        <Modal
          isVisible={visibleModal}
          onSwipeComplete={dismissModalComment}
          style={style.modal}
          propagateSwipe={true}
          onBackdropPress={dismissModalComment}>
          <CommentModal
            onSend={onSendComment}
            onCloseModal={dismissModalComment}
            data={dataComment}
          />
        </Modal>
        <Header title={data.name} scrollY={scrollY} />
        <Animated.View
          pointerEvents={'none'}
          style={[
            style.overlay,
            {
              opacity: backdrop,
            },
          ]}>
          <View>{heartIcon}</View>
          {/* <Text style={{
          
        }}>Đã lưu vào danh sách yêu thích</Text> */}
        </Animated.View>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = state => ({
  typeLogin: state.userApi.type,
});

export default connect(mapStateToProps)(PetDetailScreen);
