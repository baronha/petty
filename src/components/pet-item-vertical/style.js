import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 40,
    flexDirection: 'row',
    padding: 12,
    // backgroundColor: 'pink',
    marginTop: 24,
    borderRadius: 4,
    shadowRadius: 18,
    shadowOpacity: 0.06,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 4,
    backgroundColor: '#F0F2F5',
  },
  nameView: {
    paddingHorizontal: 24,
    flex: 1,
  },
  gender: {
    paddingHorizontal: 6,
  },
  buttonName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  type: {
    opacity: 0.6,
  },
  button: {
    backgroundColor: '#FDBF50',
    padding: 4,
    borderRadius: 4,
    right: -16,
    position: 'absolute',
    alignSelf: 'center',
    marginLeft: 16,
  },
  textAdopted: {
    color: '#fd5e5a',
    paddingTop: 4,
    fontWeight: '600',
  },
});
