import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {MapPinIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  location: locationType | null;
  setLocation: (state: locationType) => void;
  placeholder: string;
}
export type locationType = {
  text: string;
  lat: string;
  lng: string;
};

const LocationInput: React.FC<Iprops> = props => {
  const {location, setLocation, placeholder = 'Show address'} = props;

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        setLocation({
          text: 'Uzbekistan, Tashkent, Yakkasaray, Ivlieva 17, Uzbekistan, Tashkent, Yakkasaray, Ivlieva 17',
          lat: '3.200',
          lng: '30.300',
        })
      }>
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          {color: location ? colorPalet.black100 : colorPalet.black20},
        ]}>
        {location?.text || placeholder}
      </Text>
      <MapPinIcon width="16" height="16" color={colorPalet.black50} />
    </Pressable>
  );
};

export default LocationInput;
