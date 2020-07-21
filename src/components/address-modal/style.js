import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    paddingTop: 24,
    // paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FDBF50',
  },
  buttonClose: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 8,
  },
  tabView: {
    backgroundColor: 'white',
    height: 56,
    alignItems: 'flex-end',
    paddingBottom: 12,
  },
  titleTab: {
    // color: 'black'
  },
  activeButton: {
    padding: 16,
    borderLeftWidth: 4,
  },
  loadingView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
