import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 8,
  },
  buttonClose: {
    width: 64,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textClose: {
    paddingVertical: 4,
    fontWeight: 'bold',
  },
  bottom: {
    paddingLeft: 24,
    flexDirection: 'row',
    paddingTop: 12,
    alignItems: 'center',
    borderTopWidth: 0.5,
    // paddingVertical: 12,
  },
  inputView: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 4,
  },
  buttonSend: {
    paddingHorizontal: 24,
  },
  textSend: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
});
