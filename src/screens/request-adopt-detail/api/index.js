import firestore from '@react-native-firebase/firestore';

export const getAdoptDetail = async (petId) => {
  const result = await firestore()
    .collection('adoptions')
    .doc(petId)
    .get()
  return result;
};
