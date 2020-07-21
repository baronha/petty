import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
      marginTop: 24,
      flex :1,
      marginHorizontal: -24
  },
  info: {
    padding: 6,
    marginRight: 24,
    height: 84,
    width: 84,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInfo:{
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  textLabelInfo:{
    marginTop: 6,
    fontWeight: '500',
    fontSize: 12,
    // color: '#EEA070'
  }
});
