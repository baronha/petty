import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 32,
  },
  uploaderCard: {
    marginRight: -24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF2D2',
    padding: 24,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  buttonGroup: {
    position: 'absolute',
    right: -24,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContact: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 100
  },
  infoUploader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  infoText: {
    marginLeft: 16,
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    color: '#000',
  },
  userName: {
    fontSize: 12,
    color: '#FD5E5A',
    fontWeight: '600',
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  textContact: {
    color: '#FD5E5A',
    fontWeight: '600',
  },
});
