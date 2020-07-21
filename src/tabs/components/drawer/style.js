import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    height: height * 0.9 - 32,
  },
  buttonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconView: {
    padding: 6,
    borderRadius: 6,
  },
  title: {
    fontWeight: '600',
    marginLeft: 24,
    fontSize: 16,
  },
  corgiImage: {
    width: 128,
    height: 128,
    position: 'absolute',
    bottom: 64,
    alignSelf: 'center',
  },
  layoutAuth: {
    backgroundColor: '#FEE096',
    padding: 24,
    marginBottom: 24,
    borderRadius: 12,
    marginTop: -12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageAuth: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  rightAuth: {
    flex: 1,
    paddingLeft: 24,
  },
  des: {
    fontWeight: '600',
    color: '#000',
  },
  textButton: {
    fontWeight: '500',
    color: '#000',
  },
  button: {
    padding: 6,
    flex: 1,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 12,
  },
  buttonSignIn: {
    backgroundColor: '#fff',
    marginRight: 12,
  },
  buttonLogin: {
    backgroundColor: '#FDBF50',
  },
});
