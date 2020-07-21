import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    marginHorizontal: 24,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  commentInfoMain: {
    flex: 1,
    marginLeft: 24,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  commentInfo: {
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    borderTopLeftRadius: 0,
  },
  commentText: {
    fontWeight: '500',
  },
  time:{
    color: 'gray',
    fontSize: 13,
  }
});
