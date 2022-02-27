import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {CircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {}

const data = [
  {id: 0, name: 'Clinic №23', price: 101900},
  {
    id: 1,
    imageUrl: require('../../../resources/images/shoxmed.png'),
    price: 491000,
  },
  {id: 2, name: 'Clinic №51', price: 299000},
  {
    id: 3,
    imageUrl: require('../../../resources/images/shoxmed.png'),
    price: 210100,
  },
];

const DoctorOrganizationPicker: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {} = props;
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const onItemPress = (id: number) => {
    setActiveIndex(id);
  };

  const mapItems = data.map(item => {
    return (
      <Item
        key={item.id}
        isActive={activeIndex === item.id}
        data={item}
        onPress={onItemPress}
      />
    );
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('organization')}</Text>
      <View style={{marginTop: 5}}>{mapItems}</View>
    </View>
  );
};

interface ItemProps {
  isActive: boolean;
  onPress: (id: number) => void;
  data: {
    id: number;
    name?: string;
    imageUrl?: string;
    price: number;
  };
}
const Item = ({isActive, onPress, data}: ItemProps) => {
  const {id, name, imageUrl, price} = data;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.item_cont}
      onPress={() => onPress(id)}>
      <View style={styles.left_side}>
        {isActive ? (
          <CircleIcon isGradient />
        ) : (
          <View style={[styles.circle]} />
        )}
        {name && (
          <Text
            style={[
              styles.item_text,
              {
                color: isActive ? colorPalet.black100 : colorPalet.black50,
              },
            ]}>
            {name}
          </Text>
        )}
        {imageUrl && (
          <Image
            source={imageUrl as ImageSourcePropType}
            fadeDuration={100}
            style={[
              styles.item_image,
              {
                opacity: isActive ? 1 : 0.5,
              },
            ]}
          />
        )}
      </View>
      <Text
        style={[
          styles.price_text,
          {
            color: isActive ? colorPalet.black100 : colorPalet.black50,
          },
        ]}>{`≈${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
    </TouchableOpacity>
  );
};
export default DoctorOrganizationPicker;
