import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import {CloseIcon} from '../../utils/icon';
import {Tab, TabView, Menu} from '@ui-kitten/components';
import axios from 'axios';

const AddressModal = ({address, getAddress, onClose}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  // DATA
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://api.thitruongsi.com/v1/user/api/vi/locations.json?transform=true',
      )
      .then(result => {
        let locations = result.data.locations;
        setDataProvince(locations);
        // check address available
        if (Object.entries(address).length !== 0) {
          setSelectedProvince(address.province);
          setSelectedDistrict(address.district);
          setSelectedWard(address.ward);
          let districts = locations.filter(
            item => item.name === address.province,
          )[0];
          setDataDistrict(districts.values);
          let ward = districts.values.filter(
            item => item.name === address.district,
          )[0];
          setDataWard(ward.values);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useMemo(() => {
    setSelectedWard('');
    setSelectedDistrict('');
  }, [selectedProvince]);

  useMemo(() => {
    setSelectedWard('');
  }, [selectedDistrict]);

  const onSetProvince = value => {
    setSelectedProvince(value.name);
    setSelectedTabIndex(1);
    setDataDistrict(value.values);
  };

  const onSetDistrict = value => {
    setSelectedDistrict(value.name);
    setSelectedTabIndex(2);
    setDataWard(value.values);
  };

  const onSetWard = value => {
    setSelectedWard(value.name);
    const obj = {
      address: `${value.name}, ${selectedDistrict}, ${selectedProvince}`,
      ward: value.name,
      district: selectedDistrict,
      province: selectedProvince,
    };
    getAddress(obj);
  };

  const renderActiveButton = (value, activeValue, onPress) => {
    const active = value.name === activeValue ? true : false;
    return (
      <TouchableOpacity
        key={value.name}
        onPress={() => onPress(value)}
        style={[
          style.activeButton,
          {
            backgroundColor: active ? '#FEF7DC' : 'white',
            borderColor: active ? '#FDBF50' : 'transparent',
          },
        ]}>
        <Text
          style={[
            style.buttonText,
            {
              // color: active ? '#FDBF50' : 'black',
              fontWeight: active ? '600' : 'normal',
            },
          ]}>
          {value.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.buttonClose} />
        <Text style={style.titleHeader}>Chọn địa chỉ</Text>
        <TouchableOpacity onPress={onClose} style={style.buttonClose}>
          <CloseIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={style.loadingView}>
          <ActivityIndicator size={'large'} color={'#FDBF50'} />
        </View>
      ) : (
        <TabView
          tabBarStyle={style.tabView}
          selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}>
          <Tab title={selectedProvince || 'Tỉnh/Thành'}>
            <ScrollView contentContainerStyle={{paddingBottom: 200}}>
              {dataProvince.map(item => {
                return renderActiveButton(
                  item,
                  selectedProvince,
                  onSetProvince,
                );
              })}
            </ScrollView>
          </Tab>
          <Tab
            disabled={selectedProvince === '' ? true : false}
            title={selectedDistrict || 'Quận/Huyện'}>
            <ScrollView contentContainerStyle={{paddingBottom: 200}}>
              {dataDistrict.map(item => {
                return renderActiveButton(
                  item,
                  selectedDistrict,
                  onSetDistrict,
                );
              })}
            </ScrollView>
          </Tab>
          <Tab
            disabled={selectedDistrict === '' ? true : false}
            title={selectedWard || 'Phường/Xã'}>
            <ScrollView contentContainerStyle={{paddingBottom: 200}}>
              {dataWard.map(item => {
                return renderActiveButton(item, selectedWard, onSetWard);
              })}
            </ScrollView>
          </Tab>
        </TabView>
      )}
    </View>
  );
};

export default AddressModal;
