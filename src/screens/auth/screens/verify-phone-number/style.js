import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    // color : '#FDBF50',
    paddingTop: 12,
    paddingRight: 32,
  },
  phoneInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    borderBottomWidth: 2,
    paddingBottom: 12,
  },
  flag: {
    width: 28,
    height: 28,
  },
  firstPhoneText: {
    paddingHorizontal: 12,
    fontSize: 20,
    fontWeight: '600',
  },
  phoneInput: {
    color: '#FDBF50',
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
  },
  buttonSignUp: {
    margin: 24,
    backgroundColor: '#FDBF50',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSignUp:{
    fontWeight: 'bold',
    textAlign:'center',
    lineHeight: 16
  },
  buttonSignIn: {
    backgroundColor: '#F5F6FA',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  otpView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 12,
  },
  underlineStyleBase: {
    borderWidth: 0,
    alignItems: 'center',
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#E4E9F2',
    borderRadius: 4,
  },
  underlineStyleHighLighted: {
    backgroundColor: '#FDD37B',
  },
  buttonRefreshOTP: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  textRefreshOTP: {
    marginLeft: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
  lottie: {
    width: 92,
    height: 92,
    // backgroundColor: 'red'
  },
});
