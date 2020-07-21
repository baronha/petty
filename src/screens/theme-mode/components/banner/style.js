import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../utils/colors';

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: colors.white,
    alignSelf: 'center',
    padding: 15,
  },
  cat: {
    position: 'absolute',
    zIndex: 10,
    bottom: -5,
    right: -35,
  },
  bottomWindow: {
    // content: '',
    position: 'absolute',
    margin: 'auto',
    height: 18,
    top: 280,
    width: width - 72,
    backgroundColor: '#f4c7c7',
    alignSelf: 'center',
    zIndex: 3
  },
  illustration: {
    position: 'relative',
    // alignSelf: 'flex-end',
    margin: 'auto',
    width: 250,
    height: 250,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    left: 0,
    margin: 'auto',
    right: 0,
  },
  star: {
    top: 25,
  },
  sun: {
    top: 0,
    marginLeft: 0,
    // transform: scale(1),
  },
  moon: {
    top: 25,
  },
  clouds: {
    top: 50,
  },
  land: {
    bottom: 0,
  },
  mountain: {
    bottom: 45,
  },
  hill: {
    bottom: 45,
  },
  trees: {
    bottom: 25,
  },
});
