import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 24,
    minHeight: 32,
    maxHeight: 72,
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  textSend: {
    fontFamily: 'Avenir',
    paddingLeft: 24,
    fontWeight: 'bold',
  },
  avatarInput: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
});
