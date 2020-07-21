import React, {useState, useEffect} from 'react';
import {useTheme} from '@ui-kitten/components';
import {TouchableWithoutFeedback, Dimensions, Animated} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Image from 'react-native-fast-image';
import style from './style';

const {width} = Dimensions.get('window');

const ImageCarousel = ({data, scrollY}) => {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  
  const pagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={active}
        containerStyle={style.paginationView}
        dotStyle={style.pagination}
        // inactiveDotStyle={}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  return (
    <Animated.View style={style.container}>
      <Carousel
        data={data}
        style={style.swiper}
        sliderWidth={width}
        itemWidth={width}
        loop
        onSnapToItem={setActive}
        layout={'stack'}
        renderItem={({item, i}) => {
          return (
            <TouchableWithoutFeedback key={i}>
              <Image key={i} style={style.imageBanner} source={{uri: item}} />
            </TouchableWithoutFeedback>
          );
        }}
      />
      {pagination()}
    </Animated.View>
  );
};

export default ImageCarousel;
