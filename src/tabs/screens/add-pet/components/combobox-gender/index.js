import React from 'react';
import {Layout, Text, Select, useTheme} from '@ui-kitten/components';
import {gender} from '../../../../../utils/data';
import {
  GenderUndefined,
  GenderTransgender,
  GenderFemale,
  GenderMale,
} from '../../../../../utils/icon';

const ComboboxGender = ({genderType, setGender}) => {
  const theme = useTheme();

  const renderGender = () => {
    let color = theme['text-basic-color'];
    let icon = null;
    switch (genderType?.id) {
      case 0:
        icon = <GenderMale color={color} />;
        break;
      case 1:
        icon = <GenderFemale color={color} />;
        break;
      case 2:
        icon = <GenderUndefined color={color} />;
        break;
      default:
        icon = <GenderTransgender color={color} />;
        break;
    }
    return icon;
  };

  return (
    <Select
      data={gender}
      // keyExtractor={({ item, index }) => { return index + item }}
      selectedOption={genderType}
      onSelect={value => setGender(value)}
      placeholder={'Giới tính'}
      icon={() => renderGender()}
      // label={'Giới tính'}
      controlStyle={{
        backgroundColor: theme['background-basic-color-1'],
        borderWidth: 0,
      }}
    />
  );
};

export default ComboboxGender;
