import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const WIDTH_IMAGE = width / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  textInput: {
    paddingVertical: 12,
    flex: 1,
  },
  buttonSend: {
    alignSelf: 'center',
    flex: 1,
    width: 10000,
  },
  textSend: {
    paddingLeft: 24,
    fontWeight: 'bold',
  },
  image: {
    width: width / 2 - 6,
    height: WIDTH_IMAGE / 1.618,
    marginBottom: -2,
  },
  phone: {
    textDecorationLine: 'underline',
  },
  hashtag: {
    fontWeight: '500',
    color: '#055390',
    textDecorationLine: 'underline',
  },
  bubble: {
    alignSelf: 'baseline',
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerLightBox: {
    backgroundColor: 'transparent',
  },
  buttonClose: {
    alignSelf: 'flex-end',
    right: 24,
    backgroundColor: 'rgba(255,255,255,.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  textButtonClose: {
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonDetail: {
    marginHorizontal: 8,
    marginBottom: 4,
    paddingVertical: 0,
  },
});
