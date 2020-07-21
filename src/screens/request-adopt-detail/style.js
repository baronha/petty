import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleMain: {
    fontWeight: 'bold',
    paddingBottom: 24,
    fontSize: 28,
    lineHeight: 28,
  },
  image: {
    width: width - 48,
    height: (width - 48) / 2,
    alignSelf: 'center',
    borderRadius: 12,
  },
  title: {
    paddingTop: 24,
    paddingBottom: 12,
    fontWeight: '600',
  },
  bodyRequest: {
    padding: 12,
    borderRadius: 8,
  },
  bodyRequestText: {},
  time: {
    opacity: 0.5,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoMain: {
    marginVertical: -32,
    marginRight: 24,
  },
  infoDetail: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginTop: 24,
    borderRadius: 12,
  },
  infoRow: {
    paddingTop: 24,
  },
  titleInfo: {
    paddingHorizontal: 24,
    fontWeight: '500',
  },
  name: {
    marginBottom: 1,
    fontWeight: 'bold',
    color: '#000',
  },
  userName: {
    marginTop: 1,
    color: '#fd5e5a',
    fontWeight: '500',
  },
  bottomGroup: {
    padding: 24,
  },
  buttonAccept: {
    flex: 1,
    margin: 0,
    marginLeft: 24,
  },
  buttonCancel: {
    paddingHorizontal: 24,
    backgroundColor: '#F5F7FB',
  },
});
