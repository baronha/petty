import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
  },
  keyboard: {
    flex: 1,
  },
  titleMain: {
    paddingVertical: 24,
    fontWeight: 'bold',
    fontSize: 32,
  },
  marginTop: {
    marginTop: 24,
  },
  input: {
    fontWeight: '600',
  },
  infoContainer: {
    borderRadius: 8,
    padding: 24,
  },
  label: {
    marginTop: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  marginTop12: {
    marginTop: 12,
  },
  viewConfirm: {
    padding: 12,
    marginTop: 24,
    borderRadius: 4,
    // borderWidth: 0.3
  },
  buttonComplete: {
    padding: 24,
    shadowRadius: 24,
    shadowOpacity: 0.05,
  },
  buttonConfirmGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonConfirm: {
    marginTop: 12,
    marginRight: 12,
  },

  inputMulti: {
    marginTop: 24,
    flex: 1,
    marginBottom: 24,
    lineHeight: 24,
  },
  subTitle: {
    marginBottom: 12,
    fontStyle: 'italic',
    opacity: 0.6,
  },
  weightView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  unitWeight: {
    paddingBottom: 14,
    marginLeft: 24,
    fontWeight: 'bold',
    position: 'absolute',
    right: 24,
  },
  loadingContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieLoading: {
    height: 100,
    marginBottom: 24,
    // tintColor: 'white'
  },
  loadingText: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 18,
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center'
  },
});
