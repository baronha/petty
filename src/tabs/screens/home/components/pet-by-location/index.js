import React, {useEffect, useState, useMemo} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  View,
} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import style from './style';
import {PinMapIcon} from '../../../../../utils/icon';
import {
  Title,
  PetItemHorizontal,
  AddressModal,
} from '../../../../../components';
import {petByLocation} from '../../../../../utils/data';
import Modal from 'react-native-modal';
import {getAddress, saveAddress} from '../../../../../utils/helpers';
import {
  Placeholder,
  Fade,
  PlaceholderMedia,
  PlaceholderLine,
} from 'rn-placeholder';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const WIDTH_ITEM = width / 2;

const PetByLocation = ({kind, isRefreshing, getRefreshing}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [address, setAddress] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    petByLocation.length = petByLocation.length + 1;
    getAddressAsynStorage();
  }, []);

  useEffect(() => {
    if (Object.entries(address).length !== 0) {
      getData();
    }
  }, [address, kind]);

  const getData = () => {
    if (kind === null) {
      firestore()
        .collection('pets')
        .where('address.province', '==', address.province)
        .where('address.district', '==', address.district)
        .limit(5)
        .get()
        .then(querySnapshot => {
          const pets = [];
          querySnapshot.forEach(documentSnapshot => {
            pets.unshift({
              ...documentSnapshot.data(),
            });
          });
          if (querySnapshot.size >= 3) {
            pets.push({
              title: `Xem tất cả (${querySnapshot.size})`,
              id: 'title',
            });
          }
          setData(pets);
          getRefreshing(false);
          setLoading(false);
        });
    } else {
      firestore()
        .collection('pets')
        .where('type', '==', kind)
        .where('address.province', '==', address.province)
        .where('address.district', '==', address.district)
        .limit(5)
        .get()
        .then(querySnapshot => {
          const pets = [];
          querySnapshot.forEach(documentSnapshot => {
            pets.unshift({
              ...documentSnapshot.data(),
            });
          });
          if (querySnapshot.size >= 3) {
            pets.push({
              title: `Xem tất cả (${querySnapshot.size})`,
              id: 'title',
            });
          }
          setData(pets);
          getRefreshing(false);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isRefreshing) {
      getData(address);
    }
  }, [isRefreshing]);

  const getAddressAsynStorage = async () => {
    const result = await getAddress();
    if (result) {
      const userAddress = JSON.parse(result);
      setAddress(userAddress);
    }
  };

  const toggleModal = () => {
    setVisibleModal(true);
  };

  const onDismiss = () => {
    setVisibleModal(false);
  };

  const onSetAddress = async value => {
    await saveAddress(value);
    setAddress(value);
    onDismiss();
  };

  const displayEmptyList = () => {
    return (
      <Layout style={style.empty}>
        <Image
          source={require('../../../../../assets/images/error_404_pet_by_location/error_404_pet_by_location.png')}
          style={style.imageEmpty}
        />
        <View style={style.textEmptyView}>
          <Text style={style.textEmptyTop}>Chúng tôi rất tiếc !</Text>
          <Text style={style.textEmptyBottom}>
            Không tìm thấy thú cưng nào ở vị trí của bạn
          </Text>
          <View style={style.line} />
          <Text style={style.sign}>
            Đội ngũ <Text style={{fontWeight: 'bold'}}>Petty</Text>
          </Text>
        </View>
      </Layout>
    );
  };

  const displayLoading = () => {
    return (
      <Placeholder Animation={Fade}>
        <View style={style.loadingView}>
          <View>
            <PlaceholderMedia style={style.imageEmpty} />
            <PlaceholderLine style={style.line1} width={'30%'} />
            <PlaceholderLine style={style.line2} width={'20%'} />
          </View>
          <View>
            <PlaceholderMedia style={style.imageEmpty} />
            <PlaceholderLine style={style.line1} width={'30%'} />
            <PlaceholderLine style={style.line2} width={'20%'} />
          </View>
        </View>
      </Placeholder>
    );
  };

  return (
    <Layout style={style.container}>
      <Layout>
        <Title
          icon={PinMapIcon}
          title={address?.district + ', ' + address?.province}
          buttonTitle={'Chỉnh sửa'}
          onPress={toggleModal}
        />
        {isLoading ? (
          displayLoading()
        ) : (
          <FlatList
            listKey={'location'}
            data={data}
            style={style.list}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={WIDTH_ITEM + 12}
            snapToAlignment={'start'}
            ListEmptyComponent={displayEmptyList()}
            contentInset={{right: 48, bottom: 0}}
            renderItem={({item, index}) => {
              if (item?.id !== 'title') {
                return (
                  <PetItemHorizontal
                    item={item}
                    key={item.id}
                    containerStyle={{
                      marginLeft: index !== 0 && 24,
                    }}
                  />
                );
              } else {
                return (
                  <TouchableOpacity>
                    <Layout level={'3'} style={style.seeItAll}>
                      <Text style={style.textSeeItAll}>{item.title}</Text>
                    </Layout>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={item => item.id}
          />
        )}
      </Layout>
      <Modal
        isVisible={visibleModal}
        transparent={false}
        style={{margin: 0, backgroundColor: 'white'}}
        onDismiss={onDismiss}
        animationType={'slide'}
        presentationStyle={'pageSheet'}>
        <AddressModal
          address={address}
          getAddress={onSetAddress}
          onClose={onDismiss}
        />
      </Modal>
    </Layout>
  );
};

export default PetByLocation;
