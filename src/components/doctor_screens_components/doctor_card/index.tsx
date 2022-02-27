import React, {useEffect, useRef} from 'react';
import {View, Image, Text, FlatList, ImageSourcePropType} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {
  EmpathizeIcon,
  StarIcon,
  SuitcaseIcon,
} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {}

const info: ItemType[] = [
  {
    id: 0,
    name: 'Clinic №23',
    price: 150000,
  },
  {
    id: 1,
    imageUrl: require('../../../resources/images/shoxmed.png'),
    price: 259990,
  },
  {
    id: 2,
    name: 'Clinic №3',
    price: 100199,
  },
  {
    id: 3,
    imageUrl: require('../../../resources/images/shoxmed.png'),
    price: 259990,
  },
];
const aboutText =
  'Technical and Procedural Aspects of a Staged Repair of a Giant Post-Dissection Aneurysm by Using Endosizing- Based Endovascular Stenting Following Aortic Surgical Repair with Simultaneous Debranching Technique';

const DoctorCard: React.FC<Iprops> = props => {
  const {screen} = useAppSelector(state => state.globalReducer);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.doctor_cont}>
          <View style={styles.image_cont}>
            <Image
              style={styles.image}
              source={require('../../../resources/images/nurse2.png')}
            />
          </View>
          <View style={styles.text_cont}>
            <Text style={styles.doctor_name}>Abduhakimova Munavvar</Text>
            <Text style={styles.doctor_speciality}>Cardiologist</Text>
          </View>
        </View>
        <View style={styles.info_cont}>
          <View style={styles.info_item}>
            <StarIcon width="16" height="16" color={colorPalet.black20} />
            <Text style={styles.info_text}>4.5</Text>
          </View>
          <View style={styles.info_item}>
            <EmpathizeIcon width="16" height="16" color={colorPalet.black20} />
            <Text style={styles.info_text}>4.5</Text>
          </View>
          <View style={styles.info_item}>
            <SuitcaseIcon width="16" height="16" color={colorPalet.black20} />
            <Text style={styles.info_text}>4.5</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.places_cont}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        data={info}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return <PlaceItem {...item} width={screen.width} />;
        }}
      />
      <View style={styles.about_cont}>
        <Text style={styles.places_item_name}>About Doctor</Text>
        <Text style={styles.doctor_speciality}>{aboutText}</Text>
      </View>
    </>
  );
};

type ItemType = {
  id: number;
  price: number;
  name?: string;
  imageUrl?: string;
};
type WidthType = {width: number};

interface ItemProps extends ItemType, WidthType {}

const PlaceItem = (props: ItemProps) => {
  const {price, name, imageUrl, width} = props;
  const itemWidth =
    info.length === 1 ? width - 40 : info.length === 2 ? (width - 50) / 2 : 125;
  return (
    <View style={[styles.places_item_cont, {width: itemWidth}]}>
      {imageUrl && (
        <Image
          source={imageUrl as ImageSourcePropType}
          resizeMode="cover"
          style={styles.places_item_image}
        />
      )}
      {name && <Text style={styles.places_item_name}>{name}</Text>}
      <Text style={styles.places_item_price}>{`${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
    </View>
  );
};

export default DoctorCard;
