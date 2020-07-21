import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    alignItems: 'flex-end',
  },
  imageBackground: {
    width: width,
    height: width / 1.5,
  },
  titleView: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#fd5e5a',
    fontWeight: '600',
    marginTop: 12,
  },
  inputView: {
    paddingHorizontal: 24,
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#EDF1F7',
    borderRadius: 4,
    // color: '#000',
    paddingTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  passwordView: {
    marginTop: 24,
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
  lottie: {
    width: 92,
    height: 92,
    // backgroundColor: 'red'
  },

  //   orText: {
  //     textAlign: 'center',
  //     color: 'grey',
  //     fontWeight: '600',
  //   },
  //   phoneInputView: {
  //     flexDirection: 'row',
  //     backgroundColor: '#EDF1F7',
  //     alignItems: 'center',
  //     borderRadius: 4,
  //     marginTop: 12,
  //   },
  //   firstNumberText: {
  //     paddingRight: 6,
  //     fontWeight: 'bold',
  //     color: 'grey',
  //   },
  //   phoneInput: {},
  //   flagInput: {
  //     height: 32,
  //     width: 32,
  //     marginHorizontal: 6,
  //   },
});
