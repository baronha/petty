import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 24,
  },
  contentHeader: {
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // borderBottomWidth: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#333333',
  },
  loadingItem: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  lineLoading1: {
    width: '80%',
  },
  lineLoading2: {
    width: '40%',
  },
});
