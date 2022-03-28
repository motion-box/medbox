import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {PriceOfSpecialityModel} from '../../../models/DoctorModel';
import {CircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  workPlaceData: Array<PriceOfSpecialityModel> | undefined;
  pickedId?: {id: number; price: number};
  setPickedId: React.Dispatch<
    React.SetStateAction<
      {id: number; clinicId: number; price: number} | undefined
    >
  >;
}

const DoctorOrganizationPicker: React.FC<Iprops> = props => {
  const {workPlaceData, pickedId, setPickedId} = props;
  const {t} = useTranslation();

  const mapItems = workPlaceData?.map(item => {
    return (
      <Item
        key={item.id}
        isActive={pickedId?.id === item.id}
        data={item}
        onPress={() =>
          pickedId?.id !== item.id &&
          setPickedId({
            id: item.id,
            clinicId: item.clinic.id,
            price: item.price,
          })
        }
      />
    );
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('organization')}</Text>
      <View style={{marginTop: 5}}>
        {workPlaceData?.length ? (
          <>{mapItems}</>
        ) : (
          <Text style={styles.no_work_text}>{t('no_workplaces')}...</Text>
        )}
      </View>
    </View>
  );
};

interface ItemProps {
  isActive: boolean;
  onPress: () => void;
  data: PriceOfSpecialityModel;
}
const Item = ({isActive, onPress, data}: ItemProps) => {
  const {id, clinic, price} = data;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.item_cont}
      onPress={onPress}>
      <View style={styles.left_side}>
        {isActive ? (
          <CircleIcon isGradient />
        ) : (
          <View style={[styles.circle]} />
        )}
        {clinic.photo ? (
          <Image
            source={{uri: clinic.photo}}
            fadeDuration={100}
            style={[
              styles.item_image,
              {
                opacity: isActive ? 1 : 0.5,
              },
            ]}
          />
        ) : (
          <Text
            style={[
              styles.item_text,
              {
                color: isActive ? colorPalet.black100 : colorPalet.black50,
              },
            ]}>
            {clinic.name}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.price_text,
          {
            color: isActive ? colorPalet.black100 : colorPalet.black50,
          },
        ]}>{`${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs`}</Text>
    </TouchableOpacity>
  );
};
export default DoctorOrganizationPicker;
