import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#EDF1F7',
    borderRadius: 4,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 8,
  },
  textInput: {
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  passwordView: {
    marginBottom: 24,
  },
  facebookIcon: {},
  buttonFacebook: {
    backgroundColor: '#475993',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  loginButton: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  titleMainView: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  titleMain: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
});
