import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import style from './style';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {CheckmarkIcon} from '../../../../../../utils/icon';
import {setLanguageIntoStorage} from '../../../../../../utils/helpers';
import {useRecoilState} from 'recoil';
import {language} from '../../../../../../languages/recoils';

const data = [
  {
    title: '🇻🇳 Việt Nam',
    key: 'vi',
  },
  {
    title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 English',
    key: 'en',
  },
];

const LanguagesModal = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [lang, setLang] = useRecoilState(language);

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const changeLang = value => {
    setLang(value);
    setLanguageIntoStorage(value);
  };

  return (
    <Layout style={style.container}>
      <TouchableOpacity style={style.row} onPress={toggleModal}>
        <Text style={style.title}>
          {lang === 'vi' ? 'Việt Nam' : 'English'}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={visibleModal}
        style={style.modal}
        onBackdropPress={toggleModal}
        onSwipeCancel={toggleModal}>
        <Layout style={style.modalContainer}>
          {data.map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => changeLang(item.key)}
                style={[
                  style.buttonModal,
                  item.key === lang && style.buttonActive,
                ]}>
                <Text style={style.titleItem}>{item.title}</Text>
                {item.key === lang && (
                  <CheckmarkIcon height={20} width={20} fill={'#FDBF50'} />
                )}
              </TouchableOpacity>
            );
          })}
        </Layout>
      </Modal>
    </Layout>
  );
};

export default LanguagesModal;
