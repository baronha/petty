import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const WIDTH_BUTTON = width / 4 - 28;

export default StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingLeft: 12,
    paddingTop: 12,
    marginTop: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'relative',
  },
  imageButton: {
    width: WIDTH_BUTTON,
    height: WIDTH_BUTTON,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  fingerImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    width: width - 48,
    resizeMode: 'center',
    height: 'auto',
    opacity: 0.1,
  },
  deleteButton: {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    position: 'absolute',
    right: 4,
    bottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowRadius: 6,
    shadowOpacity: 0.2
  },
});
