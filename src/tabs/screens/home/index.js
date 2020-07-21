import React, {useState, useEffect, useMemo} from 'react';
import {Platform, Animated, RefreshControl} from 'react-native';
import {Layout, useTheme} from '@ui-kitten/components';
import style from './style';
import {SafeAreaLayout} from '../../../components/safe-area-layout';
import {
  Header,
  Banner,
  SearchView,
  IconFilter,
  PetByLocation,
} from './components';
import {Title, PetItemVertical} from '../../../components';
import {connect} from 'react-redux';
import {LOG_IN_SUCCESS} from '../../../screens/auth/utils/type';
import {getUserInfo} from '../../../utils/helpers';
import {
  Placeholder,
  Fade,
  PlaceholderMedia,
  PlaceholderLine,
} from 'rn-placeholder';
import firestore from '@react-native-firebase/firestore';

const NAVBAR_HEIGHT = 48;
const STATUS_BAR_HEIGHT = Platform.select({ios: 20, android: 24});

const HomeScreen = ({typeLogin}) => {
  const theme = useTheme();

  const SCROLL_ANIM = new Animated.Value(0);
  const OFFSET_ANIM = new Animated.Value(0);
  const [scrollAnim] = useState(SCROLL_ANIM);
  const [offsetAnim] = useState(OFFSET_ANIM);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isRefreshingHome, setRefreshingHome] = useState(false);
  const [isRefreshingListByLocation, setRefreshingListByLocation] = useState(
    false,
  );
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [kind, setKind] = useState(null);
  const [dataPet, setDataPet] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUserInfoData();
    getData();
  }, []);

  const getData = () => {
    if (kind === null) {
      firestore()
        .collection('pets')
        .onSnapshot(querySnapshot => {
          const pets = [];
          querySnapshot.forEach(documentSnapshot => {
            pets.unshift({
              ...documentSnapshot.data(),
            });
          });
          setDataPet(pets);
          setTotal(querySnapshot.size);
          setLoading(false);
        });
    } else {
      firestore()
        .collection('pets')
        .where('type', '==', kind)
        .onSnapshot(querySnapshot => {
          const pets = [];
          querySnapshot.forEach(documentSnapshot => {
            pets.unshift({
              ...documentSnapshot.data(),
            });
          });
          setDataPet(pets);
          setTotal(querySnapshot.size);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [kind]);

  const getFilterValue = value => {
    setKind(value);
  };

  useEffect(() => {
    if (typeLogin === LOG_IN_SUCCESS) {
      getUserInfoData();
    }
  }, [typeLogin]);

  const getUserInfoData = async () => {
    const userInfo = await getUserInfo();
    if (userInfo !== null) {
      setDataUser(JSON.parse(userInfo));
    }
  };

  // animated Header
  const [clampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim,
      ),
      0,
      NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
    ),
  );

  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;
  let _scrollEndTimer = 0;

  useEffect(() => {
    scrollAnim.addListener(({value}) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    offsetAnim.addListener(({value}) => {
      _offsetValue = value;
    });
  }, []);

  const _onScrollEndDrag = () => {
    _scrollEndTimer = setTimeout(_onMomentumScrollEnd, 250);
  };

  const _onMomentumScrollBegin = () => {
    clearTimeout(_scrollEndTimer);
  };

  const onGetRefreshing = value => {
    setRefreshingListByLocation(value);
  };

  //onRefresh
  const _onRefreshing = () => {
    setRefreshingHome(true);
    if (Object.entries(dataUser).length !== 0) {
      setRefreshingListByLocation(true);
    }
    getData();
  };

  //check refreshing
  useMemo(() => {
    if (!isRefreshingListByLocation && !isRefreshingHome) {
      setRefreshing(false);
    }
  }, [isRefreshingListByLocation, isRefreshingHome]);

  const _onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > NAVBAR_HEIGHT &&
      _clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
        ? _offsetValue + NAVBAR_HEIGHT
        : _offsetValue - NAVBAR_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  //animated

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [0, -(NAVBAR_HEIGHT + STATUS_BAR_HEIGHT)],
    extrapolate: 'clamp',
  });
  const navbarOpacity = clampedScroll.interpolate({
    inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const navbarShadow = clampedScroll.interpolate({
    inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
    outputRange: [0, 0.2],
    extrapolate: 'clamp',
  });

  const renderHeaderComponent = () => {
    return (
      <Layout
        level={'1'}
        style={[
          style.header,
          {
            paddingTop: NAVBAR_HEIGHT + 48,
          },
        ]}>
        <Banner />
        <SearchView />
        <IconFilter getValue={getFilterValue} />
        {Object.entries(dataUser).length !== 0 && (
          <PetByLocation
            isRefreshing={isRefreshingListByLocation}
            getRefreshing={onGetRefreshing}
            kind={kind}
            userAddress={dataUser.address}
          />
        )}
        <Title title={'Những bạn nhỏ cần nhà'} buttonTitle={'Xem tất cả'} />
      </Layout>
    );
  };

  return (
    <SafeAreaLayout insets="top" style={style.container}>
      <Layout level={'2'}>
        <Animated.FlatList
          data={isLoading ? ['1'] : dataPet}
          extraData={dataPet}
          horizontal={false}
          ListHeaderComponent={renderHeaderComponent()}
          contentContainerStyle={{paddingBottom: 24}}
          scrollEventThrottle={1}
          refreshControl={
            <RefreshControl
              onRefresh={_onRefreshing}
              refreshing={isRefreshing}
              tintColor={theme['text-basic-color']}
            />
          }
          onMomentumScrollBegin={_onMomentumScrollBegin}
          onMomentumScrollEnd={_onMomentumScrollEnd}
          onScrollEndDrag={_onScrollEndDrag}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollAnim}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            return isLoading ? (
              <Placeholder Animation={Fade}>
                <Layout style={style.loadingItem}>
                  <PlaceholderMedia style={style.loadingMedia} />
                  <Layout style={{flex: 1, marginHorizontal: 24}}>
                    <PlaceholderLine style={style.lineLoading1} />
                    <PlaceholderLine style={style.lineLoading2} />
                  </Layout>
                </Layout>
              </Placeholder>
            ) : (
              <PetItemVertical item={item} />
            );
          }}
          keyExtractor={item => String(item.id)}
        />
        <Animated.View
          style={[
            style.navbar,
            {
              transform: [{translateY: navbarTranslate}],
              height: NAVBAR_HEIGHT,
              paddingTop: STATUS_BAR_HEIGHT + 28,
              paddingBottom: 24,
              backgroundColor: theme['background-basic-color-1'],
              shadowOpacity: navbarShadow,
              // shadowColor: 'red',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowRadius: 24,
            },
          ]}>
          <Animated.View
            style={[
              style.contentHeader,
              {
                opacity: navbarOpacity,
              },
            ]}>
            <Header dataUser={dataUser} />
          </Animated.View>
        </Animated.View>
      </Layout>
    </SafeAreaLayout>
  );
};

const mapStateToProps = state => ({
  typeLogin: state.userApi.type,
});

export default connect(mapStateToProps)(HomeScreen);
