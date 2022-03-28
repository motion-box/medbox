import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import styles from './style';
import {Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigatorTypes} from '../../../navigation';
import {colorPalet} from '../../../resources/style/globalStyle';
import {MapPinIcon} from '../../../resources/icons/icons';
import Geolocation from 'react-native-geolocation-service';
import {useAndroidLocationPermission} from '../../../hooks/useAndroidLocationPermission';

interface Iprops {
  location: locationType | null;
  placeholder: string;
}
export type locationType = {
  address: string;
  lat: string;
  lng: string;
};

const LocationInput: React.FC<Iprops> = props => {
  const {location, placeholder} = props;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const onChoosePress = async () => {
    const permission = await useAndroidLocationPermission();
    if (permission === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          navigation.navigate(NavigatorTypes.stacks.mapScreen, {
            taskType: 'get_position',
            userPos: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  return (
    <Pressable style={styles.container} onPress={onChoosePress}>
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          {color: location ? colorPalet.black100 : colorPalet.black20},
        ]}>
        {location?.address || placeholder}
      </Text>
      <MapPinIcon width="16" height="16" color={colorPalet.black50} />
    </Pressable>
  );
};

export default LocationInput;
