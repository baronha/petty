import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#ffffff92'
  },
  name: {
    textAlign: 'center',
    paddingTop: 24,
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24,
  },
  userName: {
    paddingTop: 4,
    textAlign: 'center',
  },
  infoView: {
    padding: 18,
    borderRadius: 8,
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoHint: {
    fontSize: 12,
    fontWeight: '500',
  },
  textNumber: {
    fontSize: 20,
    paddingTop: 12,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  buttonEdit: {
    marginHorizontal: 24,
  },
  menu:{
    position: 'absolute',
    top: 24,
    left: 24
  }
});
