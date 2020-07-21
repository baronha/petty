import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  header: {
    height: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      height: -10,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  knob: {
    width: 56,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6,
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
});
