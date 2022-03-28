import Geolocation from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';

export const useAndroidLocationPermission = async () => {
  let granded = undefined;
  if (Platform.OS === 'ios') {
    granded = await Geolocation.requestAuthorization('whenInUse');
  } else if (Platform.OS === 'android') {
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    const coarseLocation =
      res[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === 'granted';
    const fineLocation =
      res[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === 'granted';
    if (coarseLocation && fineLocation) {
      granded = 'granted';
    }
  }
  return granded;
};
