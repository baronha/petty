import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  view: {
    alignItems: 'center',
    flex: 1,
  },
  buttonAvatar: {
    backgroundColor: '#FEE096',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  backgroundImage: {
    backgroundColor: '#FDBF50',
    width: 124,
    height: 124,
    borderRadius: 62,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  input: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  bottom: {
    padding: 24,
    backgroundColor: 'white',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: 'white',
  },
  avatarView: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  labelInput: {
    alignSelf: 'flex-start',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 58,
    width: 112,
    height: 112,
    alignSelf: 'center',
    top: 4,
    bottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputAdress: {
    backgroundColor: 'pink',
    height: 40,
    borderRadius: 4,
    width: Dimensions.get('window').width - 48,
    justifyContent: 'center',
  },
  address: {
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  textComplete: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonComplete: {
    backgroundColor: '#FDBF50',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 92,
    height: 92,
  },
});
