import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    padding: 24,
    paddingBottom: 0,
  },
  buttonAdd: {
    borderWidth: 1,
    margin: 24,
    borderRadius: 8,
    alignItems: 'center',
    padding: 24,
  },
  buttonAddView:{
    padding: 8,
    borderRadius: 24,
  },
  imageBackgroundFooter: {
    width: width - 48,
    resizeMode: 'center',
    height: 'auto',
    ...StyleSheet.absoluteFill
  },
});
