import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 24,
    flexDirection: 'row',
    padding: 24,
  },
  image: {
    width: 64,
    height: 64,
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: '#FEE096',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  info: {
    flex: 1,
    paddingHorizontal: 24,
  },
  name: {
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  moreButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  requestCount:{
    color: 'rgba(0,0,0,.8)',
  }
});
