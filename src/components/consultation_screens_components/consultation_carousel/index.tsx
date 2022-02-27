import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInUp,
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../hooks/redux';

interface Iprops {}

const data = [
  {
    id: 0,
    title: 'Alisa Miller',
    subTitle: 'Alisa Miller',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 1,
    title: 'Azamat Alimov',
    subTitle: 'Azamat Alimov',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 2,
    title: 'Ulugbek Alimov',
    subTitle: 'Ulugbek Alimov',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 3,
    title: 'Avaz Shoabdullaev',
    subTitle: 'Avaz Shoabdullaev',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
  {
    id: 4,
    title: 'Timur Timur',
    subTitle: 'Timur Timur',
    description:
      'You can find the doctor you need and consult with him about your health problems',
  },
];

const ConsultationCarousel: React.FC<Iprops> = props => {
  const {} = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
    return (
      <Card key={item.id} isActive={activeIndex === item.id} data={item} />
    );
  });

  const mapDots = data.map(item => {
    return <Dot key={item.id} isActive={activeIndex === item.id} />;
  });

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>{mapCards}</View>
      <View style={styles.pagination_cont}>{mapDots}</View>
    </View>
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

type cardType = {
  isActive: boolean;
  data: {title: string; subTitle: string; description: string};
};

const Card = ({isActive, data}: cardType) => {
  const {title, subTitle, description} = data;
  return (
    <>
      {isActive && (
        <Animated.View
          style={styles.card_container}
          entering={FadeInUp.duration(400).delay(400)}
          exiting={FadeOutDown.duration(400)}>
          <View
            style={{
              position: 'absolute',
              left: 40,
              zIndex: 1,
              top: 40,
              width: '50%',
            }}>
            <Text style={styles.card_subtitle}>{subTitle}</Text>
            <Text style={styles.card_title} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.card_description}>{description}</Text>
          </View>
          <Image
            source={require('../../../resources/images/recomend.jpg')}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: 30,
            }}
          />
        </Animated.View>
      )}
    </>
  );
};

export default ConsultationCarousel;
