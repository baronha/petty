import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 24,
    shadowOpacity: 0.05,
    shadowRadius: 24,
    alignItems: 'center',
  },
  likeButton: {
    height: 32,
    width: 48,
    marginRight: 24,
    backgroundColor: '#FD5E5A',
    shadowColor: '#FD5E5A',
    shadowRadius: 12,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 12,
      width: 0,
    },
  },
  adoptButton: {
    height: 32,
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerModal: {
    height: height - (width - 24),
    borderTopLeftRadius: 24,
    padding: 24,
  },
  titleView: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  iconView: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  textInput: {
    maxHeight: 124,
    height: 124,
    borderRadius: 8,
    padding: 12,
    paddingTop: 12,
  },
  notice: {
    marginTop: 24,
    fontStyle: 'italic',
  },
  overlaySent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 24,
  },
  lottieView: {
    height: 92,
    width: 92,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    marginBottom: 12,
  },
  textSent: {
    bottom: 12,
    position: 'absolute',
    textAlign: 'center',
    right: 0,
    left: 0,
    fontWeight: '500',
  },
  buttonEdit: {
    backgroundColor: '#F5F7FB',
    flex: 1,
    marginLeft: 24,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fd5e5a',
    borderWidth: 1.5,
    borderColor: '#fff'
  },
  textBadge:{
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },  
});
