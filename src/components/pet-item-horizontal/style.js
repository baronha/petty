import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const WIDTH_IMAGE = (width - 24) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH_IMAGE,
  },
  image: {
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE / 1.618,
    borderRadius: 8,
  },
  titleView: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  distance: {
    marginTop: 4,
    opacity: 0.7,
  },
  textAdopted: {
    color: '#fd5e5a',
    paddingTop: 4,
    fontWeight: '600',
  },
});
