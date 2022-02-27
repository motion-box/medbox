import React, {useEffect, useState} from 'react';
import {View, Touchable, Text} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
import CardTitler from '../../global_components/card_titler';
import RatingStars from '../../global_components/rating_stars';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../../hooks/redux';
import {CloseCircleIcon} from '../../../resources/icons/icons';

interface Iprops {}

const DoctorReview: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  useEffect(() => {
    console.log(activeFilter);
  }, [activeFilter]);
  return (
    <View style={styles.container}>
      <Text style={styles.titler}>{t('reviews')}</Text>
      <View style={styles.review_cont}>
        <View style={styles.review_left_cont}>
          <View style={styles.numbers_cont}>
            <Text style={styles.average_number}>4.3</Text>
            <Text style={styles.overal_number}>/5</Text>
          </View>
          <Text style={styles.all_reviews}>{`120 ${t('reviews')}`}</Text>
          <RatingStars rate={4} textAcitve={false} />
        </View>
        <View style={styles.stars_cont}>
          {[5, 4, 3, 2, 1].map(item => {
            return (
              <React.Fragment key={item}>
                <StarLine
                  stars={item as 1 | 2 | 3 | 4 | 5}
                  overal={120}
                  exact={70}
                />
                {item > 1 && <View style={styles.spacer} />}
              </React.Fragment>
            );
          })}
        </View>
      </View>
      <View style={styles.filter_cont}>
        <Filter
          screenWidth={screen.width}
          stars={5}
          isActive={activeFilter}
          setActive={setActiveFilter}
        />
        <Filter
          screenWidth={screen.width}
          stars={4}
          isActive={activeFilter}
          setActive={setActiveFilter}
        />
        <Filter
          screenWidth={screen.width}
          stars={3}
          isActive={activeFilter}
          setActive={setActiveFilter}
        />
        <Filter
          screenWidth={screen.width}
          stars={2}
          isActive={activeFilter}
          setActive={setActiveFilter}
        />
        <Filter
          screenWidth={screen.width}
          stars={1}
          isActive={activeFilter}
          setActive={setActiveFilter}
        />
      </View>
      {[0, 1, 2, 3, 4, 5].map(item => {
        return <CommentView key={item} />;
      })}
    </View>
  );
};

interface StarLineProps {
  stars: 1 | 2 | 3 | 4 | 5;
  overal: number;
  exact: number;
}
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const StarLine = (props: StarLineProps) => {
  const {stars, overal, exact} = props;
  const flex = useSharedValue(0);
  useEffect(() => {
    flex.value = withDelay(
      500,
      withTiming(parseFloat((exact / overal).toFixed(1))),
    );
  }, []);
  const rStyle = useAnimatedStyle(() => {
    return {
      flex: flex.value,
    };
  });
  return (
    <View style={styles.line_cont}>
      <Text style={styles.line_text}>{stars} star</Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.line}>
          <AnimatedLinearGradient
            colors={colorPalet.brandGradient}
            style={[{flex: 0.75, borderRadius: 2.5}, rStyle]}
            useAngle={true}
            angle={90}
          />
        </View>
      </View>
    </View>
  );
};

interface FilterProps {
  screenWidth: number;
  stars: 1 | 2 | 3 | 4 | 5;
  isActive: number | null;
  setActive: (state: number | null) => void;
}
const Filter = (props: FilterProps) => {
  const {screenWidth, stars, isActive, setActive} = props;
  const itemWidth = (screenWidth - 80) / 5;
  const width = useSharedValue(itemWidth);
  useEffect(() => {
    if (isActive === null) {
      width.value = withTiming(itemWidth);
    } else if (isActive !== stars) {
      width.value = withTiming(itemWidth - 6);
    }
  }, [isActive]);

  const onPress = () => {
    console.log(stars);
    width.value = withTiming(itemWidth + 26);
    setActive(isActive !== stars ? stars : null);
  };
  const rStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      width.value,
      [itemWidth, 80],
      [colorPalet.white100, colorPalet.black100],
    );
    return {
      width: width.value,
      backgroundColor: color,
      borderRadius: 10,
      height: 30,
      marginHorizontal: 5,
    };
  });
  return (
    <Animated.View style={rStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.filter_button}>
        <Text
          style={[
            styles.filter_text,
            {
              color:
                isActive === stars ? colorPalet.white100 : colorPalet.black50,
              marginRight: isActive === stars ? 10 : 0,
            },
          ]}>
          {stars} star
        </Text>
        {isActive === stars && (
          <CloseCircleIcon width="16" height="16" color={colorPalet.white50} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
interface CommentViewProps {}
const CommentView = (props: CommentViewProps) => {
  return (
    <View style={styles.comment}>
      <CardTitler
        name="Alisa Miller"
        imageUrl={`${require('../../../resources/images/img.png')}`}
        stars={3}
        right={{
          centered: {
            text: moment('2022-01-12T10:30', 'YYYY-MM-DDTHH:mm').format(
              'DD.MM.YY HH:mm',
            ),
          },
        }}
      />
      <Text style={styles.comment_text}>
        Technical and Procedural Aspects of a Staged Repair of a Giant
        Post-Dissection Aneurysm by Using Endosizing- Based Endovascular
        Stenting Following Aortic Surgical Repair with Simultaneous Debranching
        Technique
      </Text>
    </View>
  );
};

export default DoctorReview;
