import React, {useState, useRef, useEffect} from 'react';
import {Image, View, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Divider,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import {DrawerContent} from './components';
import HomeScreen from './screens/home';
import SearchScreen from './screens/search';
import AddPetScreen from './screens/add-pet';
import MessageScreen from './screens/message';
import UserScreen from './screens/user';
import {useSafeArea} from 'react-native-safe-area-context';
import {SafeAreaLayout} from '../components/safe-area-layout';
import {getUserInfo} from '../utils/helpers';
import {MenuContext} from '../utils/context';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import style from './style';

const HomeIcon = index => (
  <Image
    style={style.icon}
    source={
      index === 0
        ? require('../assets/images/home-active/home-active.png')
        : require('../assets/images/home/home.png')
    }
  />
);

const TabBarIcon = (style, name, index, indexTab) => {
  const active = index === indexTab ? true : false;
  return <Icon {...style} name={active ? name : name + '-outline'} />;
};

const routeAuthScreen = ['Message', 'User'];

const TabBarComponent = props => {
  const [index, setIndex] = useState(0);

  const insets = useSafeArea();

  const onSelect = async index => {
    const user = await getUserInfo();
    if (index === 2) {
      if (user !== null) {
        props.navigation.navigate('AddPetScreen');
      } else {
        props.navigation.navigate('GeneralAuthScreen');
      }
    } else {
      const selectedTabRoute = props.state.routes[index];
      const onHandleTab = () => {
        setIndex(index);
        props.navigation.navigate(selectedTabRoute.name);
      };
      if (routeAuthScreen.includes(selectedTabRoute.name)) {
        if (user !== null) {
          setIndex(index);
          onHandleTab();
        } else {
          props.navigation.navigate('GeneralAuthScreen');
        }
      } else {
        onHandleTab();
      }
    }
  };

  return (
    <View style={{borderRadius: 24, backgroundColor: 'red'}}>
      <Divider />
      <BottomNavigation selectedIndex={props.state.index} onSelect={onSelect}>
        <BottomNavigationTab icon={() => HomeIcon(index)} />
        <BottomNavigationTab
          icon={style => TabBarIcon(style, 'search', index, 1)}
        />
        <BottomNavigationTab
          icon={style => TabBarIcon(style, 'plus-square-outline')}
        />
        <BottomNavigationTab
          icon={style => TabBarIcon(style, 'message-circle', index, 3)}
        />
        <BottomNavigationTab
          icon={style => TabBarIcon(style, 'person', index, 4)}
        />
      </BottomNavigation>
      <SafeAreaLayout insets="bottom" />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBarComponent {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AddPet" component={AddPetScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

const defaultScalingDrawerConfig = {
  scalingFactor: 0.7,
  minimizeFactor: 0.6,
  swipeOffset: 20,
};

const Drawer = () => {
  const menuRef = useRef();
  const theme = useTheme();
  const AnimatedView = Animated.View;
  let fall = new Animated.Value(1);

  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    const nextMenu = !menu;
    setMenu(nextMenu);
  };

  useEffect(() => {
    if (menu) {
      menuRef.current.snapTo(1);
      menuRef.current.snapTo(1);
    } else {
      // menuRef.current?.snapTo(0);
    }
  }, [menu]);

  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    return (
      <AnimatedView
        pointerEvents={'none'}
        style={[
          style.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    );
  };

  const onCloseEnd = () => {
    toggleMenu();
  };

  const renderHeader = () => (
    <Layout style={style.header}>
      <Layout style={[style.knob, {
        backgroundColor: theme['text-basic-color'] + '92'
      }]} />
    </Layout>
  );

  return (
    <MenuContext.Provider value={{menu, toggleMenu}}>
      <MainTab />
      {renderShadow()}
      <BottomSheet
        ref={menuRef}
        initialSnap={0}
        callbackNode={fall}
        snapPoints={[0, '50%', '90%']}
        renderHeader={renderHeader}
        onCloseEnd={onCloseEnd}
        renderContent={() => <DrawerContent onClose={onCloseEnd} />}
      />
    </MenuContext.Provider>
  );
};

export default Drawer;
