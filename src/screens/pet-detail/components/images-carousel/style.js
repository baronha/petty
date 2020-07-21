import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const HEIGHT_SWIPER = width ;

export default StyleSheet.create({
  container: {},
  swiper: {
    height: HEIGHT_SWIPER,
  },
  scroll: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 24,
  },
  imageBanner: {
    width: width,
    height: HEIGHT_SWIPER,
    backgroundColor: '#F0F2F5'
  },
  paginationView: {
    position: 'absolute',
    bottom: 12,
  },
  //   pagination: {
  //   },
});
