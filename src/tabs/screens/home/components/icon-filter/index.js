import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, Image} from 'react-native';
import style from './style';

const data = [
  {
    id: 0,
    icon: require('../../../../../assets/images/all-icon/all-icon.png'),
    value: null,
  },
  {
    id: 1,
    icon: require('../../../../../assets/images/dog-icon/dog-icon.png'),
    value: 'dog',
  },
  {
    id: 2,
    icon: require('../../../../../assets/images/cat-icon/cat-icon.png'),
    value: 'cat',
  },
  {
    id: 3,
    icon: require('../../../../../assets/images/bird-icon/bird-icon.png'),
    value: 'bird',
  },
  {
    id: 4,
    icon: require('../../../../../assets/images/fish-icon/fish-icon.png'),
    value: 'fish',
  },
];

const IconFilter = ({getValue, isSearch}) => {
  const [active, setActive] = useState(isSearch ? null : 0);

  const onActive = (item, index) => {
    getValue(item.value);
    setActive(index);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style.conatiner}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={[
              style.button,
              {
                marginLeft: index !== 0 && 24,
                borderWidth: active === index && 2,
              },
            ]}
            key={index}
            onPress={() => onActive(item, index)}>
            <Image style={style.icon} source={item.icon} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default IconFilter;
