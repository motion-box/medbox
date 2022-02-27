import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Iprops {
  data: {id: number; imageUrl: string; title: string; description: string}[];
}

const WelcomeCarousel: React.FC<Iprops> = props => {
  const {data} = props;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let intervalIndex = 0;
    const interval = setInterval(() => {
      if (intervalIndex === data.length - 1) {
        intervalIndex = 0;
        setActiveIndex(0);
        return;
      }
      intervalIndex = intervalIndex + 1;
      setActiveIndex(intervalIndex);
    }, 5000);

    return () => {
      setActiveIndex(0);
      clearInterval(interval);
    };
  }, []);

  const mapCards = data.map(item => {
    return <Card key={item.id} isActive={item.id === activeIndex} />;
  });

  const mapDots = data.map(item => {
    return <Dot key={item.id} isActive={activeIndex === item.id} />;
  });

  const mapText = data.map(item => {
    return (
      activeIndex === item.id && (
        <Animated.View
          key={item.id}
          entering={FadeIn.duration(400).delay(400)}
          exiting={FadeOut.duration(400)}
          style={styles.text_cont}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
        </Animated.View>
      )
    );
  });
  return (
    <View style={{flex: 1}}>
      <View style={{height: '60%', padding: 20}}>{mapCards}</View>
      <View style={styles.pagination_cont}>{mapDots}</View>
      {mapText}
    </View>
  );
};

type cardType = {isActive: boolean};
const Card = ({isActive}: cardType) => {
  return (
    <>
      {isActive && (
        <Animated.View
          style={styles.card_container}
          entering={FadeInUp.duration(400).delay(400)}
          exiting={FadeOutDown.duration(400)}>
          <Image
            source={require('../../../resources/images/welcome.jpg')}
            style={{
              zIndex: 1,
              width: '100%',
              height: '100%',
              borderRadius: 30,
            }}
          />
        </Animated.View>
      )}
    </>
  );
};

type dotType = {isActive: boolean};
const Dot = ({isActive}: dotType) => {
  const width = useSharedValue(6);

  useEffect(() => {
    width.value = isActive
      ? withTiming(15, {duration: 500})
      : withTiming(6, {duration: 500});
  }, [isActive]);

  const styled = useAnimatedStyle(() => {
    const color = interpolateColor(width.value, [6, 12], ['#ffffff76', '#fff']);
    return {
      width: width.value,
      backgroundColor: color,
    };
  });

  return <Animated.View style={[styles.pagination_dot, styled]} />;
};

export default WelcomeCarousel;
