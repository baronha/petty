import React, {useState, useRef, useEffect} from 'react';
import {FlatList, Animated, TextInput, RefreshControl} from 'react-native';
import {
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
  Button,
  Spinner,
} from '@ui-kitten/components';
import style from './style';
import {Header, MessageItem} from './components';
import {SearchIcon, CloseIcon} from '../../../utils/icon';
import {getUserInfo} from '../../../utils/helpers';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {LOG_IN_SUCCESS} from '../../../screens/auth/utils/type';
import Lottie from 'lottie-react-native';

const MessageScreen = ({typeLogin}) => {
  const [dataUser, setDataUser] = useState({});
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const theme = useTheme();
  let searchRef = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [isRefresh, setRefresh] = useState(false);
  // animated
  const searchBarTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -64],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 24],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const scrollMarginTop = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -88],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    onGetDataUser();
  }, []);

  useEffect(() => {
    if (Object.entries(dataUser).length !== 0) {
      const subscriber = firestore()
        .collection('contacts')
        .doc(dataUser.doc_id)
        .onSnapshot(documentSnapshot => {
          const dataSnapshot = documentSnapshot.data();
          if (dataSnapshot && Object.entries(dataSnapshot).length !== 0) {
            const contacts = Object.keys(dataSnapshot).map(
              i => dataSnapshot[i],
            );
            setData(contacts);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }
  }, [dataUser]);

  useEffect(() => {
    if (typeLogin === LOG_IN_SUCCESS) {
      onGetDataUser();
    }
  }, [typeLogin]);

  const onGetDataUser = async () => {
    let user = await getUserInfo();
    if (user !== null) {
      setDataUser(JSON.parse(user));
    }
  };

  const onChangeText = text => {
    setKeyword(text);
  };

  const onSearch = () => {};

  const deleteKeyword = () => {
    setKeyword('');
  };

  const renderEmpty = (
    <Layout style={style.lottieView}>
      <Lottie
        style={style.lottie}
        autoPlay
        source={require('../../../assets/lotties/message-empty.json')}
      />
      <Button style={style.button}>Viết tin nhắn mới</Button>
    </Layout>
  );

  return (
    <Layout level={'2'} style={style.container}>
      <Header />
      <Animated.View
        style={[
          style.header,
          {
            transform: [{translateY: searchBarTranslate}],
            opacity: searchBarOpacity,
            backgroundColor: theme['background-basic-color-1'],
          },
        ]}>
        <Layout level={'2'} style={style.searchView}>
          <TopNavigationAction icon={SearchIcon} />
          <TextInput
            ref={ref => {
              searchRef = ref;
            }}
            value={keyword}
            onChangeText={onChangeText}
            placeholder="Tìm kiếm"
            placeholderTextColor={theme['text-hint-color']}
            style={[
              style.searchBar,
              {
                color: theme['text-basic-color'],
              },
            ]}
            editable={data.length === 0 ? false : true}
            returnKeyType={'search'}
            autoCorrect={false}
            onSubmitEditing={onSearch}
          />
          {keyword !== '' && (
            <TopNavigationAction
              icon={() => (
                <CloseIcon
                  width={24}
                  height={24}
                  fill={theme['text-hint-color']}
                />
              )}
              onPress={deleteKeyword}
            />
          )}
        </Layout>
      </Animated.View>
      {isLoading ? (
        <Layout style={style.loaderView}>
          <Spinner size={'large'} />
        </Layout>
      ) : data.length === 0 ? (
        renderEmpty
      ) : (
        <Animated.FlatList
          data={data}
          style={[
            style.scroll,
            {
              transform: [{translateY: scrollMarginTop}],
            },
          ]}
          scrollEventThrottle={16}
          refreshControl={<RefreshControl refreshing={isRefresh} />}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}},
          ])}
          renderItem={({item, index}) => {
            return <MessageItem item={item} dataUser={dataUser} />;
          }}
          keyExtractor={item => item.id}
        />
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  typeLogin: state.userApi.type,
});

export default connect(mapStateToProps)(MessageScreen);
