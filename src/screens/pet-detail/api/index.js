import firestore from '@react-native-firebase/firestore';

export const getPetDetail = async petId => {
  const response = firestore()
    .collection('pets')
    .doc(petId);
  const data = await response;
  return data;
};

export const getAdopt = async petId => {
  const response = firestore()
    .collection('adoptions')
    .doc(petId)
    .get();
  const data = await response;
  return data;
};
