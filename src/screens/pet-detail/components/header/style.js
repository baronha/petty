import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
  },
  safeView: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 4,
    borderRadius: 4,
  },
  background:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    shadowRadius: 24,
    shadowOpacity: 0.1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal :24,
    textAlign: 'center',
    flex: 1
  },
});
