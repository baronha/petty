import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'red',
  },
  searchView: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 8,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  lottieView: {
    width: width,
    height: height,
    flex: 1,
  },
  lottie: {},
  button: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
    left: 24,
    fontWeight: 'bold',
    fontSize: 24,
  },
  loaderView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
