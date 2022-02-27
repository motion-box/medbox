import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import styles from './style';
import {
  colorPaletTypes,
  colorPalet,
} from '../../../resources/style/globalStyle';
import {useAppSelector} from '../../../hooks/redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Iprops {
  data: {
    id: string;
    text: string;
    onPress: (id: string) => void;
  }[];
  options?: {
    buttonHeight?: 30 | 40;
    marginHorizontal?: number;
    backgroundColor?: colorPaletTypes;
  };
}

const Slider: React.FC<Iprops> = props => {
  const {screen} = useAppSelector(state => state.globalReducer);
  const {data, options} = props;
  const [activeIndex, setActiveIndex] = useState(data[0].id);
  const marginHorizontal = options?.marginHorizontal || 20;
  const itemWidth =
    (screen.width - 2 * marginHorizontal - 10) / data.length - 2.5;
  const left = useSharedValue(5);

  const rStyle = useAnimatedStyle(() => {
    return {
      left: left.value,
    };
  });

  const onPress = (id: string, index: number) => {
    setActiveIndex(id);
    let leftpar = index == 0 ? 5 : index == 1 ? 8 : 11.5;
    left.value = withTiming(index * itemWidth + leftpar);
    data[index].onPress(id);
  };

  const mapItems = data.map((item, index) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => onPress(item.id, index)}
        style={[
          styles.button,
          {
            height: options?.buttonHeight || 30,
          },
        ]}>
        <Text
          style={{
            color:
              activeIndex === item.id
                ? colorPalet.white100
                : colorPalet.black100,
          }}>
          {item.text}
        </Text>
      </Pressable>
    );
  });
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorPalet[options?.backgroundColor || 'white100'],
          // marginHorizontal: marginHorizontal,
        },
      ]}>
      {mapItems}
      <Animated.View
        style={[
          styles.item,
          rStyle,
          {
            width: itemWidth,
            height: options?.buttonHeight || 30,
          },
        ]}
      />
    </View>
  );
};

export default Slider;
