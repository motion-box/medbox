import React, {useEffect, useState} from 'react';
import {View, Touchable, Text} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInDown,
  FadeOutDown,
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
import {EstimateModel} from '../../../models/DoctorModel';
import EmptyEvent from '../../global_components/empty_event';

interface Iprops {
  data: Array<EstimateModel>;
}

const DoctorReview: React.FC<Iprops> = props => {
  const {data} = props;
  const {t} = useTranslation();
  const {screen} = useAppSelector(state => state.globalReducer);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [allReviews, setReviews] = useState<Array<EstimateModel>>([]);
  const [filteredRates, setFilteredRates] = useState({
    average: 0,
    amount: 0,
    byNumbers: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  });

  useEffect(() => {
    if (data.length) {
      setReviews(data);

      const rates = data.map(item => item.rate);
      const average = rates.reduce((a, b) => a + b, 0) / rates.length;
      var ratesNumber = rates.reduce<{[key: number]: number}>(
        (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
        {},
      );
      if (rates.length) {
        setFilteredRates({
          amount: rates.length,
          average: parseFloat(average.toFixed(1)),
          byNumbers: {
            5: ratesNumber[5] ? ratesNumber['5'] : 0,
            4: ratesNumber[4] ? ratesNumber['4'] : 0,
            3: ratesNumber[3] ? ratesNumber['3'] : 0,
            2: ratesNumber[2] ? ratesNumber['2'] : 0,
            1: ratesNumber[1] ? ratesNumber['1'] : 0,
          },
        });
      }
    }
  }, [data]);

  const onFilterPress = (id: number | null) => {
    if (id === null) {
      setReviews(data);
      setActiveFilter(null);
      return;
    }
    let byStar = data.filter(item => item.rate === id);
    setReviews(byStar);
    setActiveFilter(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titler}>{t('reviews')}</Text>
      <View style={styles.review_cont}>
        <View style={styles.review_left_cont}>
          <View style={styles.numbers_cont}>
            <Text style={styles.average_number}>{filteredRates.average}</Text>
            <Text style={styles.overal_number}>/5</Text>
          </View>
          <Text style={styles.all_reviews}>{`${filteredRates.amount} ${t(
            'reviews',
          )}`}</Text>
          <RatingStars rate={filteredRates.average} textAcitve={false} />
        </View>
        <View style={styles.stars_cont}>
          {[5, 4, 3, 2, 1].map(item => {
            return (
              <React.Fragment key={item}>
                <StarLine
                  stars={item as 1 | 2 | 3 | 4 | 5}
                  overal={filteredRates.amount}
                  exact={filteredRates.byNumbers[item as 1 | 2 | 3 | 4 | 5]}
                />
                {item > 1 && <View style={styles.spacer} />}
              </React.Fragment>
            );
          })}
        </View>
      </View>
      <View style={styles.filter_cont}>
        {[5, 4, 3, 2, 1].map(item => (
          <Filter
            key={item}
            screenWidth={screen.width}
            stars={item as 5 | 4 | 3 | 2 | 1}
            isActive={activeFilter}
            setActive={onFilterPress}
          />
        ))}
      </View>
      {allReviews.length ? (
        allReviews.map(item => (
          <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            key={item.id}>
            <CommentView data={item} />
          </Animated.View>
        ))
      ) : (
        <View>
          <EmptyEvent text={t('no_reviews')} icon="StarFillIcon" />
        </View>
      )}
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
  const {t} = useTranslation();
  const {stars, overal, exact} = props;
  const flex = useSharedValue(0);
  useEffect(() => {
    if (overal) {
      flex.value = withDelay(
        500,
        withTiming(parseFloat((exact / overal).toFixed(1))),
      );
    }
  }, [overal]);
  const rStyle = useAnimatedStyle(() => {
    return {
      flex: flex.value,
    };
  });
  return (
    <View style={styles.line_cont}>
      <Text style={styles.line_text}>
        {stars} {t('star')}
      </Text>
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
  const {t} = useTranslation();
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
    <Animated.View style={[rStyle]}>
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
          {stars} {t('star')}
        </Text>
        {isActive === stars && (
          <CloseCircleIcon width="16" height="16" color={colorPalet.white50} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
interface CommentViewProps {
  data: EstimateModel;
}
const CommentView = ({data}: CommentViewProps) => {
  return (
    <View style={styles.comment}>
      <CardTitler
        name={`${data.user.first_name} ${data.user.last_name}`}
        imageUrl={data.user.photo}
        stars={data.rate}
        right={{
          centered: {
            text: moment(data.created_time).format('DD.MM.YY HH:mm'),
          },
        }}
      />
      <Text style={styles.comment_text}>{data.comment}</Text>
    </View>
  );
};

export default DoctorReview;
