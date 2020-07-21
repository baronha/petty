import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
  button: {
    height: 50,
    width: 100,
    backgroundColor: colors.white,
    borderRadius: 25,
    justifyContent: 'center',
  },
  switch: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    zIndex: 1,
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.3,
  },
  crater: {
    position: 'absolute',
    backgroundColor: colors.craterColor,
    zIndex: 1,
    borderRadius: 100,
  },
  crater_1: {
    top: 18,
    left: 10,
    width: 4,
    height: 4,
  },
  crater_2: {
    top: 28,
    left: 22,
    width: 6,
    height: 6,
  },
  crater_3: {
    top: 10,
    left: 25,
    width: 8,
    height: 8,
  },
  star: {
    position: 'absolute',
    backgroundColor: colors.white,
    // transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    borderRadius: 24,
  },
  star_1: {
    top: 10,
    left: 35,
    zIndex: 0,
    width: 30,
    height: 2,
  },
  star_2: {
    top: 18,
    left: 28,
    zIndex: 1,
    width: 30,
    height: 2,
  },
  star_3: {
    top: 27,
    left: 40,
    zIndex: 0,
    width: 30,
    height: 2,
  },
  star_4: {
    top: 16,
    left: 11,
    zIndex: 0,
    width: 2,
    height: 2,
    // transform: translate3d(3px, 0, 0);
  },
  star_5: {
    top: 32,
    left: 17,
    zIndex: 0,
    width: 3,
    height: 3,
    // transform: translate3d(3px, 0, 0);
  },
  star_6: {
    top: 36,
    left: 28,
    zIndex: 0,
    width: 2,
    height: 2,
    // transform: translate3d(3px, 0, 0);
  },
});
