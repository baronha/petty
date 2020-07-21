import React, {useState, useRef, useEffect} from 'react';
import {
  Layout,
  Text,
  Input,
  Button,
  useTheme,
  Select,
  CheckBox,
} from '@ui-kitten/components';
import {ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import style from './style';
import {
  AlertHelper,
  LoadingButton,
  AddressModal,
  HeaderModal,
} from '../../../components';
import {ImagePicker, Health, Age, ComboboxGender} from './components';
import {petType} from '../../../utils/data';
import {View, Text as AnimatedText} from 'react-native-animatable';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {getUserInfo} from '../../../utils/helpers';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import NavigationService from '../../../navigators/NavigationService';

const buttonArray = [
  {
    title: 'Có',
    value: true,
  },
  {
    title: 'Không',
    value: false,
  },
];

const AddPetScreen = ({route}) => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');
  const [ageType, setAgeType] = useState(null);
  const [health, setHealth] = useState(50);
  const [showForm, setShowForm] = useState(null);
  const [summary, setSummary] = useState('');
  const [weight, setWeight] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [address, setAddress] = useState({});
  const [visibleAddress, setVisibleAddress] = useState(false);
  //check state
  const [checkGender, setCheckGender] = useState(false);
  const [checkAge, setCheckAge] = useState(false);
  const [checkHealth, setCheckHealth] = useState(false);
  const [checkWeight, setCheckWeight] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getUserInfoData();
  }, []);

  const getUserInfoData = async () => {
    const userInfo = await getUserInfo();
    const userInfoJson = JSON.parse(userInfo);
    setUserInfo(userInfoJson);
    setAddress(userInfoJson.address);
  };

  const theme = useTheme();
  let myScrollView = useRef();

  const onSetForm = index => {
    setShowForm(index === showForm ? null : index);
  };

  const AlerError = message => {
    AlertHelper.show('error', 'Hmmm', message);
  };

  // adress handle

  const onSetAddress = value => {
    setAddress(value);
    dismissModalAddress();
  };

  const toggleModalAddress = () => {
    setVisibleAddress(true);
    Keyboard.dismiss();
  };

  const dismissModalAddress = () => {
    setVisibleAddress(false);
  };

  const complete = () => {
    setLoading(true);
    let petObj = {
      name,
      type: type.value,
      has_owner: showForm === 0 ? true : false,
      age:
        age === ''
          ? undefined
          : {
              value: Number(age),
              age_type: ageType.value,
            },
      weight: weight || undefined,
      is_adopted: false,
      health: showForm === 1 ? (checkHealth ? health : undefined) : health,
      gender: gender?.value ?? undefined,
      summary: summary,
      uploader: userInfo,
      address: address,
      images: [
        'https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/system_images%2Fplaceholder.png?alt=media',
      ],
    };
    firestore()
      .collection('pets')
      .add(petObj)
      .then(result => {
        let imageArray = [];
        images.map((uri, index) => {
          storage()
            .ref()
            .child(`pets/${result.id}/${index}`)
            .putFile(uri)
            .then(() => {
              if (index === images.length - 1) {
                setLoading(false);
                NavigationService.navigate('PetDetailScreen', {
                  petId: result.id,
                });
              }
            })
            .catch(e => console.log(e));
          imageArray.push(
            `https://firebasestorage.googleapis.com/v0/b/petty-607e9.appspot.com/o/pets%2F${
              result.id
            }%2F${index}?alt=media`,
          );
          if (index === images.length - 1) {
            firestore()
              .collection('pets')
              .doc(result.id)
              .update({
                id: result.id,
                images: imageArray,
              });
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (showForm === 1) {
      if (!checkGender) {
        setGender('');
      }
      if (!checkAge) {
        setAge('');
        setAgeType('');
      }
    }
  }, [checkGender, checkAge, checkHealth]);

  const onComplete = () => {
    if (showForm === 0) {
      if (gender?.value === undefined) {
        AlerError(
          'Bạn không được để trống thông tin giới tính. nếu bạn không xác định được giới tính thú cưng. xin mời nhấn vào lựa chọn " Không xác định "',
        );
      } else if (weight === '') {
        AlerError(`Bạn chưa nhập cân nặng kìa !`);
      } else if (weight === '0' || weight === '00' || weight === '000') {
        AlerError(`Tại sao cân nặng lại là ${weight} ? Giỡn mặt hả ?`);
      } else if (age === '') {
        AlerError(
          `Bạn là chủ nhân của  ${name}.\nVì vậy bạn phải biết rõ tuổi của em ấy chứ. đừng bỏ trống thông tin tuổi nha !`,
        );
      } else if (age === '0' || age === '00') {
        AlerError(`Tại sao tuổi lại là ${age} ? Giỡn mặt hả ?`);
      } else if (ageType?.value === undefined) {
        AlerError(
          `${age} tháng tuổi hay là năm tuổi ?? dường như bạn chưa chọn thuộc tính tuổi cho ${name}`,
        );
      } else if (health === 0) {
        AlerError(`Tình trạng sức khoẻ = 0 ? Bạn chắc chưa ?`);
      } else {
        complete();
      }
    } else if (showForm === 1) {
      let fail = false;
      if (checkGender) {
        if (gender?.value === undefined) {
          AlerError(
            'Bạn không được để trống thông tin giới tính. nếu bạn không xác định được giới tính thú cưng. xin mời nhấn vào lựa chọn " Không xác định "',
          );
          fail = true;
        }
      }
      if (checkWeight) {
        if (weight === '') {
          fail = true;
          AlerError(`Đừng bỏ trống cân nặng nha !`);
        } else if (weight === '0' || weight === '00' || weight === '000') {
          fail = true;
          AlerError(`Tại sao cân nặng lại là ${weight} ? Giỡn mặt hả ?`);
        }
      }
      if (checkAge === true) {
        if (age === '') {
          AlerError(`Đừng bỏ trống thông tin tuổi nha !`);
          fail = true;
        } else if (age === '0' || age === '00') {
          AlerError(`Tại sao tuổi lại là ${age} ? Giỡn mặt hả ?`);
          fail = true;
        } else if (ageType?.value === undefined) {
          AlerError(
            `${age} tháng tuổi hay là năm tuổi ?? dường như bạn chưa chọn thuộc tính tuổi cho ${name}`,
          );
          fail = true;
        }
      }
      if (checkHealth) {
        if (health <= 0) {
          AlerError(`Tình trạng sức khoẻ = 0 ? Bạn chắc chưa ?`);
          fail = true;
        }
      }
      if (summary.length < 100) {
        AlerError(
          `Mô tả của bạn quá ngắn. ít nhất phải trên 100 ký tự như dòng thông báo này nè!`,
        );
        fail = true;
      }
      if (!fail) {
        complete();
      }
    }
  };

  const getPosition = e => {
    if (e?.nativeEvent?.contentOffset?.y > 64) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  };

  return (
    <Layout style={style.container}>
      <HeaderModal title={'Thêm thú cưng'} scrollY={scrollY} />
      <KeyboardAvoidingView behavior={'padding'} style={style.keyboard}>
        <ScrollView
          ref={ref => {
            myScrollView = ref;
          }}
          style={style.scrollContainer}
          onScroll={getPosition}
          scrollEventThrottle={16}
          // scrollIndicatorInsets={{ bottom: 56 }}
        >
          <Text style={style.titleMain}>Thêm thú cưng</Text>
          <ImagePicker images={images} setImages={setImages} />
          <Input
            label="Tên thú cưng"
            placeholder="Petty iz da pest"
            textStyle={style.input}
            autoCorrect={false}
            style={style.marginTop}
            value={name}
            onChangeText={setName}
          />
          <Select
            data={petType}
            selectedOption={type}
            onSelect={value => setType(value)}
            placeholder={'Lựa chọn'}
            label={'Loại thú cưng'}
            style={style.marginTop12}
          />
          {type !== null && name !== '' && (
            <View
              animation={'bounceIn'}
              style={[
                style.viewConfirm,
                {
                  backgroundColor: theme['background-basic-color-area'],
                  borderColor: theme['color-basic-transparent-default-border'],
                },
              ]}>
              <Text>
                Bạn có phải là con sen của{' '}
                <Text style={{fontWeight: 'bold'}}>{name}</Text> không ?
              </Text>
              <Layout style={style.buttonConfirmGroup}>
                {buttonArray.map((item, index) => {
                  return (
                    <Button
                      size={'small'}
                      onPress={() => onSetForm(index)}
                      style={[
                        style.buttonConfirm,
                        {
                          backgroundColor:
                            showForm === index
                              ? theme['color-primary-500']
                              : theme['color-basic-transparent-400'],
                        },
                      ]}
                      textStyle={{
                        color:
                          showForm === index
                            ? '#000'
                            : theme['text-basic-color'],
                      }}
                      key={index}>
                      {item.title}
                    </Button>
                  );
                })}
              </Layout>
            </View>
          )}
          {showForm !== null && name !== '' && (
            <Layout>
              <View style={style.marginTop} animation={'bounceInLeft'}>
                <Text
                  style={[
                    style.label,
                    {
                      marginTop: 0,
                    },
                  ]}>
                  Thông tin
                </Text>
                <Layout level={'2'} style={style.infoContainer}>
                  {showForm === 0 && (
                    <View animation={'fadeIn'}>
                      <ComboboxGender
                        genderType={gender}
                        setGender={setGender}
                      />
                      <Layout
                        level={'2'}
                        style={[style.marginTop12, style.weightView]}>
                        <Input
                          label="Cân nặng"
                          placeholder="VD: 0.6"
                          textStyle={style.input}
                          autoCorrect={false}
                          maxLength={3}
                          style={[
                            style.marginTop12,
                            {
                              backgroundColor:
                                theme['background-basic-color-1'],
                              flex: 1,
                            },
                          ]}
                          keyboardType={'numeric'}
                          value={weight}
                          onChangeText={setWeight}
                        />
                        <Text
                          style={[
                            style.unitWeight,
                            {
                              color: theme['text-hint-color'],
                            },
                          ]}>
                          Kg
                        </Text>
                      </Layout>
                      <Text style={style.label}>Tuổi thú cưng</Text>
                      <Age
                        age={age}
                        setAge={setAge}
                        ageType={ageType}
                        setAgeType={setAgeType}
                      />
                      <Text style={style.label}>Tình trạng sức khoẻ</Text>
                      <Health health={health} setHealth={setHealth} />
                    </View>
                  )}
                  {showForm === 1 && (
                    <View animation={'fadeIn'}>
                      {/* <Text >
                        {'    '}Nếu bạn không phải là chủ nhân của {name} thì
                        chúng tôi cần bạn xác nhận một số thông tin chi tiết của{' '}
                        {name}, nêu bạn biết thì hãy cung cấp cho chúng tôi biết
                        nhé.{' '}
                      </Text> */}
                      <Text style={style.subTitle}>
                        Hãy giúp chúng tôi trả lời những câu hỏi ?
                      </Text>
                      <CheckBox
                        text={`Bạn có biết giới tính của ${name} không ?`}
                        checked={checkGender}
                        onChange={value => {
                          setCheckGender(value);
                        }}
                        style={style.marginTop12}
                      />
                      {checkGender && (
                        <View style={style.marginTop12} animation={'fadeIn'}>
                          <ComboboxGender
                            genderType={gender}
                            setGender={setGender}
                          />
                        </View>
                      )}
                      <CheckBox
                        text={`Bạn có biết cân nặng của ${name} không ?`}
                        checked={checkWeight}
                        onChange={value => {
                          setCheckWeight(value);
                        }}
                        style={style.marginTop}
                      />
                      {checkWeight && (
                        <View
                          style={[style.marginTop12, style.weightView]}
                          animation={'fadeIn'}>
                          <Input
                            placeholder="VD: 0.6"
                            textStyle={style.input}
                            autoCorrect={false}
                            maxLength={3}
                            style={{
                              backgroundColor:
                                theme['background-basic-color-1'],
                              flex: 1,
                            }}
                            keyboardType={'numeric'}
                            value={weight}
                            onChangeText={setWeight}
                          />
                          <Text
                            style={[
                              style.unitWeight,
                              {
                                color: theme['text-hint-color'],
                              },
                            ]}>
                            Kg
                          </Text>
                        </View>
                      )}
                      <CheckBox
                        style={style.marginTop}
                        text={`Bạn có biết tuổi chính xác của ${name} không ?`}
                        checked={checkAge}
                        onChange={value => {
                          setCheckAge(value);
                        }}
                      />
                      {checkAge && (
                        <View style={style.marginTop12} animation={'fadeIn'}>
                          <Age
                            age={age}
                            setAge={setAge}
                            ageType={ageType}
                            setAgeType={setAgeType}
                          />
                        </View>
                      )}
                      <CheckBox
                        style={style.marginTop}
                        text={`Bạn có nắm rõ tình trạng sức khoẻ của ${name} không ?`}
                        checked={checkHealth}
                        onChange={value => {
                          setCheckHealth(value);
                        }}
                      />
                      {checkHealth && (
                        <View style={style.marginTop12} animation={'fadeIn'}>
                          <Health health={health} setHealth={setHealth} />
                        </View>
                      )}
                    </View>
                  )}
                </Layout>
              </View>
              <Input
                label="Địa chỉ"
                textStyle={style.input}
                autoCorrect={false}
                style={style.marginTop}
                value={`${address.ward}, ${address.district} ${
                  address.province
                }`}
                onFocus={toggleModalAddress}
                editable={false}
              />
              <Input
                label="Mô tả"
                placeholder={`Mô tả chi tiết về ${name}. \nHay là bạn hãy kể về cuộc gặp gỡ của bạn và ${name} `}
                autoCorrect={false}
                style={style.inputMulti}
                multiline
                onFocus={() =>
                  myScrollView.scrollTo({x: 0, y: 750, animated: true})
                } // <- your coordinates here
                value={summary}
                onChangeText={setSummary}
              />
            </Layout>
          )}
        </ScrollView>
        <Modal
          isVisible={visibleAddress}
          transparent={false}
          style={{margin: 0, backgroundColor: 'white'}}
          onDismiss={dismissModalAddress}
          animationType={'slide'}
          presentationStyle={'pageSheet'}>
          <AddressModal
            address={address}
            getAddress={onSetAddress}
            onClose={dismissModalAddress}
          />
        </Modal>
      </KeyboardAvoidingView>
      {showForm !== null && name !== '' && (
        <LoadingButton title={'Hoàn tất'} onPress={onComplete} />
      )}
      {isLoading && (
        <View style={style.loadingContainer} animation={'fadeIn'}>
          <View animation={'fadeIn'} delay={200} style={style.loadingView}>
            <Lottie
              autoPlay
              source={require('../../../assets/lotties/loading-dot.json')}
              style={style.lottieLoading}
            />
            <AnimatedText style={style.loadingText}>Đang xử lý</AnimatedText>
          </View>
        </View>
      )}
    </Layout>
  );
};

export default AddPetScreen;
