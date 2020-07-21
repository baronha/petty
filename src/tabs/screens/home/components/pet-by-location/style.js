import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2.5;

export default StyleSheet.create({
  container: {},
  list: {
    paddingLeft: 24,
    paddingVertical: 24,
  },
  empty: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageEmpty: {
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE / 1.5,
    borderRadius: 8,
  },
  textEmptyView: {
    flex: 1,
    maxWidth: width - WIDTH_IMAGE - 24,
    paddingHorizontal: 24,
    height: WIDTH_IMAGE / 1.5,
  },
  textEmptyTop: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  textEmptyBottom: {
    fontWeight: '500',
  },
  line: {
    height: 4,
    width: WIDTH_IMAGE / 3,
    backgroundColor: '#FFCE47',
    borderRadius: 8,
    bottom: 0,
    marginVertical: 12,
  },
  sign: {
    fontWeight: '300',
  },
  loadingView: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: width,
    justifyContent: 'space-between',
  },
  line1: {
    marginTop: 12,
    width: '80%',
  },
  line2: {
    width: '50%',
  },
  seeItAll: {
    height: (width - 24) / 2 / 1.618,
    marginLeft: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  textSeeItAll: {
    fontWeight: 'bold',
    // color: '#FFCE47'
  },
});
