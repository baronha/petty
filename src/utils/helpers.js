// import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

export const convertInfo = info => {
  const array = [
    {gender: info.gender},
    {age: info.age},
    {weight: info.weight},
    {health: info.health},
  ];
  return array.filter(item => Object.values(item)[0]);
};

export const validatePhoneNumber = phone => {
  let phoneNumber = phone;
  if (phone.charAt(0) !== '0') {
    phoneNumber = '0'.concat(phone);
  }
  var regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return {
    isPhone: regexp.test(phoneNumber),
    formatNumber: '+84' + phoneNumber.substring(1),
  };
};

export const validateEmail = email => {
  return /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/.test(
    email,
  );
};

export const validateUserName = userName => {
  return /^[a-zA-Z0-9_.]+$/.test(userName);
};

export const getUserInfo = async () => {
  const response = AsyncStorage.getItem('petty.userInfo');
  let data = await response;
  return data;
};

export const saveAddress = async address => {
  try {
    await AsyncStorage.setItem('petty.address', JSON.stringify(address));
  } catch (e) {
    console.log('address', e);
  }
};

export const getAddress = async () => {
  return AsyncStorage.getItem('petty.address');
};

export const setThemeMode = async theme => {
  try {
    await AsyncStorage.setItem('petty.theme', JSON.stringify({theme}));
  } catch (e) {
    console.log('theme', e);
  }
};

export const getThemeMode = async () => {
  try {
    return AsyncStorage.getItem('petty.theme');
  } catch (e) {
    console.log('theme', e);
  }
};

export const setLanguageIntoStorage = async lang => {
  try {
    await AsyncStorage.setItem('petty.language', JSON.stringify({lang}));
  } catch (e) {
    console.log('theme', e);
  }
};

export const getLanguageFromStorage = async () => {
  try {
    return AsyncStorage.getItem('petty.language');
  } catch (e) {
    console.log('theme', e);
  }
};

// export const saveKeywordHistorySearch = (keyword) => {
//     // if active product tab
//     let dataKeySearch = [];
//     AsyncStorage.getItem('petty.historySearch')
//         .then(result => {
//             if (result) {
//                 dataKeySearch = JSON.parse(result);
//                 const keyList = dataKeySearch.filter(
//                     item => item.keyword !== keyword,
//                 );
//                 dataKeySearch = keyList;
//                 dataKeySearch.unshift({
//                     keyword,
//                 });
//                 dataKeySearch.splice(11, 1);
//                 AsyncStorage.setItem(
//                     'petty.historySearch',
//                     JSON.stringify(dataKeySearch),
//                 );
//             } else {
//                 dataKeySearch = [
//                     {
//                         keyword,
//                     },
//                 ];
//                 AsyncStorage.setItem(
//                     'petty.historySearch',
//                     JSON.stringify(dataKeySearch),
//                 );
//             }
//         })
//         .done();

// };
