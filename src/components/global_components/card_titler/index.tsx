import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import RatingStars from '../rating_stars';
import LinearGradient from 'react-native-linear-gradient';
import * as Icons from '../../../resources/icons/icons';
import PopupMenu from '../popup_menu';

interface Iprops {
  imageUrl: string;
  name: string;
  stars?: 1 | 2 | 3 | 4 | 5 | number;
  subtitle?: string;
  clipper?: 'white' | 'bg';
  right: {
    centered?: CenteredViewType;
    boldFirst?: BoldFirstViewType;
    boldSecond?: BoldSecondViewType;
  };
}

const CardTitler: React.FC<Iprops> = props => {
  const {imageUrl, name, stars, subtitle, clipper = 'white', right} = props;
  return (
    <View style={styles.container}>
      <View style={styles.left_side}>
        <Image
          source={
            imageUrl
              ? {uri: imageUrl}
              : require('../../../resources/images/user_logo.png')
          }
          style={styles.image}
        />
        <View
          style={{
            marginLeft: 5,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text numberOfLines={1} ellipsizeMode="clip" style={styles.title}>
            {name}
          </Text>
          {stars !== undefined ? (
            <RatingStars rate={stars} textAcitve={true} />
          ) : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <LinearGradient
            colors={
              clipper === 'white'
                ? ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                : ['rgba(246,250,250,0)', 'rgba(246,250,250,1)']
            }
            start={{x: 0, y: 10}}
            end={{x: 0.8, y: 10}}
            style={styles.grad}
          />
        </View>
      </View>
      <View style={styles.right_side}>
        {right?.boldFirst ? <BoldFirstView {...right.boldFirst} /> : null}
        {right?.boldSecond ? <BoldSecondView {...right.boldSecond} /> : null}
        {right?.centered ? <CenteredView {...right.centered} /> : null}
      </View>
    </View>
  );
};

interface BoldFirstViewType {
  title: string;
  subtitle: string;
}
const BoldFirstView = (props: BoldFirstViewType) => {
  const {title, subtitle} = props;
  return (
    <View style={styles.bold_first}>
      <Text style={styles.bold_first_view_title}>{title}</Text>
      <Text style={styles.bold_first_view_subtitle}>{subtitle}</Text>
    </View>
  );
};

interface BoldSecondViewType {
  title: string;
  subtitle: string;
}
const BoldSecondView = (props: BoldSecondViewType) => {
  const {title, subtitle} = props;
  return (
    <View style={styles.bold_first}>
      <Text style={styles.bold_second_view_title}>{title}</Text>
      <Text style={styles.bold_second_view_subtitle}>{subtitle}</Text>
    </View>
  );
};

interface CenteredViewType {
  text: string;
  options?: {
    icon: Icons.AllIconsType;
    text: string;
    disabled: boolean;
    onPress: () => void;
  }[];
}
const CenteredView = (props: CenteredViewType) => {
  const {text, options} = props;

  return (
    <View style={styles.centered}>
      <Text style={styles.centered_text}>{text}</Text>
      {options ? <PopupMenu options={options} /> : null}
    </View>
  );
};
export default CardTitler;
