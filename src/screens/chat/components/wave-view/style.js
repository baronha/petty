import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    transform: [{rotateX: '180deg'}],
  },
  avatarWave: {
    height: 92,
    width: 92,
    borderRadius: 46,
    borderWidth: 2,
  },
  nameWaveView: {
    paddingVertical: 12,
  },
  nameWave: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
  },
  userNameWave: {
    fontWeight: '500',
    color: '#FD5E5A',
    textAlign: 'center',
  },
  iconWaveView: {
    height: 72,
    width: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F6FB',
  },
  iconWave: {
    textAlign: 'center',
    fontSize: 32,
  },
  textWave: {
    fontWeight: '500',
    paddingTop: 24,
    textAlign: 'center',
  },
  top: {
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
  },
});
