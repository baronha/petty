import React from 'react';
import {Icon, useTheme} from '@ui-kitten/components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuIcon = style => {
  return <Icon {...style} name="menu" />;
};

const SearchIcon = style => {
  return <Icon {...style} name="search" />;
};

const PinMapIcon = style => {
  return <Icon {...style} name="pin-outline" />;
};

const ArrowForward = style => {
  return <Icon {...style} name="arrow-forward-outline" />;
};

const PlusIcon = style => {
  return <Icon {...style} name="plus-outline" />;
};

const CheckmarkIcon = style => {
  return <Icon {...style} name="checkmark" />;
};

const GenderFemale = ({size, color}) => {
  return (
    <MaterialIcon size={size ? size : 24} color={color} name="gender-female" />
  );
};

const GenderMale = ({size, color}) => {
  return (
    <MaterialIcon size={size ? size : 24} color={color} name="gender-male" />
  );
};

const GenderUndefined = ({size, color}) => {
  return (
    <MaterialIcon
      size={size ? size : 24}
      color={color}
      name="gender-male-female"
    />
  );
};

const GenderTransgender = ({size, color}) => {
  return (
    <MaterialIcon
      size={size ? size : 24}
      color={color}
      name="gender-transgender"
    />
  );
};

const BackIcon = ({size, color}) => {
  return (
    <MaterialIcon
      size={size ? size : 24}
      color={color}
      name="keyboard-backspace"
    />
  );
};

const OptionsIcon = style => {
  return <Icon {...style} name="options-outline" />;
};

const CloseCirlcleFillIcon = style => {
  return <Icon {...style} name="close-circle" />;
};

const CloseIcon = style => {
  return <Icon {...style} name="close" />;
};

const CameraFillIcon = style => {
  return <Icon {...style} name="camera" />;
};

const ShareIcon = style => {
  return <Icon {...style} name="share-outline" />;
};

const MoreHoriontalIcon = style => {
  return <Icon {...style} name="more-horizontal" />;
};

const MapPinIcon = style => {
  return <Icon {...style} name="pin" />;
};

const HeartIcon = style => {
  return <Icon {...style} name="heart" />;
};

const HeartOutlineIcon = style => {
  return <Icon {...style} name="heart-outline" />;
};

const MessageCircleOutlineIcon = style => {
  return <Icon {...style} name="message-circle-outline" />;
};

const PhoneOutlineIcon = style => {
  return <Icon {...style} name="phone-outline" />;
};

const RefreshIcon = style => {
  return <Icon {...style} name="refresh-outline" />;
};

const Image2Icon = style => {
  return <Icon {...style} name="image-2" />;
};


export {
  MenuIcon,
  SearchIcon,
  PinMapIcon,
  ArrowForward,
  GenderFemale,
  GenderMale,
  OptionsIcon,
  CloseCirlcleFillIcon,
  CloseIcon,
  BackIcon,
  CameraFillIcon,
  GenderUndefined,
  GenderTransgender,
  ShareIcon,
  MoreHoriontalIcon,
  MapPinIcon,
  HeartIcon,
  HeartOutlineIcon,
  MessageCircleOutlineIcon,
  PhoneOutlineIcon,
  RefreshIcon,
  Image2Icon,
  PlusIcon,
  CheckmarkIcon
};
