import database from '@react-native-firebase/database';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

export const onSend = (value, id, dataUser, friendInfo, image, petId) => {
  const time = moment().format();
  const user = {};
  user._id = dataUser.doc_id;
  user.name = dataUser.name;
  user.avatar = dataUser.avatar;
  user.user_name = dataUser.user_name;
  const message = {
    text: value,
    createdAt: time,
    image,
    user,
  };

  // petId for request
  if (petId) {
    message.pet_id = petId;
  }

  database()
    .ref(`/messages/${id}`)
    .push()
    .set(message)
    .then(result => {
      const last_message = {
        body: value,
        from: dataUser.doc_id,
        time,
        to: friendInfo.doc_id,
        image,
        // type:
      };
      const contact = {
        id,
        last_act: time,
        last_message,
        read: false,
      };

      let contactFromMe = Object.assign({}, contact);
      let contactFromFriend = Object.assign({}, contact);

      contactFromMe.user = friendInfo;
      contactFromFriend.user = dataUser;
      // add contact friend
      firestore()
        .collection('contacts')
        .doc(dataUser.doc_id)
        .update({[friendInfo.doc_id]: contactFromMe});
      // add contact me
      firestore()
        .collection('contacts')
        .doc(friendInfo.doc_id)
        .update({[dataUser.doc_id]: contactFromFriend});
    });
};
