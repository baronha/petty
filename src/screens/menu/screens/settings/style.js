import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backIcon: {
    // marginRight: 24,
    alignSelf: 'flex-end',
    padding: 6,
    borderRadius: 24,
    marginTop: 24,
  },
  titleMain: {
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  buttonLogOut: {
    marginBottom: 36,
    marginHorizontal: 0,
  },
  titleButton: {
    fontWeight: 'bold',
    color: '#000',
  },
});
