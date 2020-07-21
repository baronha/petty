import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width,
    height: width,
    flex: 1,
    alignSelf: 'center'
  },
  bottom: {
    padding: 24,
    paddingBottom: 48
  },
  hiText: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Avenir'
  },
  titleMain: {
    fontWeight: '500',
    paddingVertical: 12,
  },
});
