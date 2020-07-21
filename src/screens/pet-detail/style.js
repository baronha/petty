import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const HEIGHT_SWIPER = width / 1.618;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: HEIGHT_SWIPER,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 24,
  },
  content: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    padding: 24,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 38,
  },
  shareIcon: {
    marginTop: 6,
    padding: 4,
    borderRadius: 4,
  },
  subTitle: {
    marginTop: 8,
    color: '#AAAAAA',
  },
  addressView: {
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  address: {
    marginHorizontal: 12,
  },
  summary: {
    lineHeight: 24,
  },
  heartBreakImage: {
    height: 120,
    width: 120,
  },
  lottie: {
    width: width,
    height: width,
    alignSelf: 'center',
  },
  titleComment: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 32,
  },
  gradient: {
    position: 'absolute',
    bottom: 48,
    right: 0,
    left: 0,
    height: 300,
    marginHorizontal: -24,
  },
  textSeeAll: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  componentFooter: {
    bottom: -48,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  newOwner:{
    marginBottom: -24,
    marginTop: 24,
    fontWeight: 'bold'
  }
});
