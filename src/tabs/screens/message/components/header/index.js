import React from 'react';
import {
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import style from './style';
import {MenuIcon} from '../../../../../utils/icon';
import {SafeAreaLayout} from '../../../../../components/safe-area-layout';

const Header = ({title}) => {
  const theme = useTheme();

  return (
    <Layout style={style.container}>
      <SafeAreaLayout insets={'top'} />
      <Layout style={style.row}>
        <TopNavigationAction icon={MenuIcon} />
        <Text
          style={[
            style.title,
            {
              color: theme['text-basic-color'],
            },
          ]}>
          {title}
        </Text>
        <Layout style={{width: 24}} />
      </Layout>
    </Layout>
  );
};

export default Header;

Header.defaultProps = {
  title: 'Tin nhắn',
};
