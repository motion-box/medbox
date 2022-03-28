import React, {useEffect, useRef, useState} from 'react';
import {View, NativeSyntheticEvent} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import YaMap, {Animation, CameraPosition} from 'react-native-yamap';
import StatusBarFocus from '../../components/global_components/StatusBarCustom';
import MapControl from '../../components/map_screens_components/map_control';
import MapHeader from '../../components/map_screens_components/map_header';
import MapMarker from '../../components/map_screens_components/map_marker';
import MapAim from '../../components/map_screens_components/map_aim';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import MapShareModal from '../../components/map_screens_components/map_share_modal';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../hooks/redux';
import {userSlice} from '../../store/reducers/UserSlice';
YaMap.init('d2179af6-c0a1-4f9f-bd40-f0396dc8a507');

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: ParamsForGetPos | ParamsForShowMap;
  };
}

type ParamsForGetPos = {
  taskType: 'get_position';
  userPos: {latitude: number; longitude: number};
  placeName: never;
  placePos: never;
};
type ParamsForShowMap = {
  taskType: 'show_on_map';
  userPos: {latitude: number; longitude: number};
  placeName: string;
  placePos: {latitude: number; longitude: number};
};

type MarkerTypes = {latitude: number; longitude: number};

const MapScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();
  const {taskType, userPos, placeName, placePos} = route.params;
  const map = useRef<YaMap>(null);
  const center = useRef(userPos);
  const aimValue = useSharedValue(0);
  const [destroyMap, setDestroyMap] = useState(true);
  const [isMapLink, setMapLink] = useState(false);
  const dispatch = useAppDispatch();
  const {setChoosenLocation} = userSlice.actions;

  /**
   * @enum focuse - Render map only affter screen focuse
   * @description We need to do this step because sometimes map gets out of screen boundaries
   * @enum beforeRemove - Disable map before screen remove
   * @description We need to do this because map doesn't disabled, this affects to performance
   */
  useEffect(() => {
    navigation.addListener('focus', e => {
      setDestroyMap(false);
      setTimeout(() => {
        if (map.current) {
          map.current.fitAllMarkers();
        }
      }, 500);
    });
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      setDestroyMap(true);
      navigation.dispatch(e.data.action);
      return;
    });
    return () => {
      navigation.removeListener('focus', e => {
        setDestroyMap(false);
      });
      navigation.removeListener('beforeRemove', e => {
        console.log('unmount');
        e.preventDefault();
        setDestroyMap(true);
        navigation.dispatch(e.data.action);
        return;
      });
    };
  }, [navigation]);

  /**
   * Fcouse camera on pressed marker
   */
  const onMarkerPress = async (data: MarkerTypes) => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setCenter(
        {lat: data.latitude, lon: data.longitude},
        position.zoom,
        position.azimuth,
        position.tilt,
        1,
        Animation.SMOOTH,
      );
    }
  };
  /**
   * Callback function to get camera position
   * @param CameraPosition
   */
  const onCameraPositionChange = (
    event: NativeSyntheticEvent<CameraPosition>,
  ) => {
    if (event.nativeEvent.point) {
      center.current = {
        latitude: event.nativeEvent.point.lat,
        longitude: event.nativeEvent.point.lon,
      };
    }
  };
  /**
   * Control panel focuse on user position button callback
   */
  const focuseOnUserLocation = async () => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setCenter(
        {lat: userPos.latitude, lon: userPos.longitude},
        position.zoom,
        position.azimuth,
        position.tilt,
        1,
        Animation.SMOOTH,
      );
    }
  };
  /**
   * Control panel zoom up button callback
   */
  const zoomUp = async () => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 1.1, 0.5);
    }
  };
  /**
   * Control panel zoom down button callback
   */
  const zoomDown = async () => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 0.9, 0.5);
    }
  };
  /** Hellper async callback to get CameraPosition
   */
  const getCurrentPosition = () => {
    return new Promise<CameraPosition>(resolve => {
      if (map.current) {
        map.current.getCameraPosition(position => {
          resolve(position);
        });
      }
    });
  };

  /** On bottom button pressed */
  const onBottomButtonPress = () => {
    if (taskType === 'show_on_map') {
      console.log('Open navigators enum');
      openInNavigationApps();
    } else {
      console.log(
        'Choosen location is - {lat:',
        center.current.latitude,
        'lng:',
        center.current.longitude,
      );
      dispatch(
        setChoosenLocation({
          latitude: center.current.latitude.toString(),
          longitude: center.current.longitude.toString(),
          address: t('address_changed'),
        }),
      );
      navigation.goBack();
    }
  };

  const openInNavigationApps = () => {
    setMapLink(true);
  };

  return (
    <View style={styles.container}>
      <StatusBarFocus translucent barStyle="dark-content" />
      {destroyMap === false && (
        <YaMap
          ref={map}
          style={styles.container}
          showUserPosition={false}
          tiltGesturesEnabled={false}
          onTouchStart={() =>
            taskType == 'get_position' && (aimValue.value = withSpring(1))
          }
          onTouchEnd={() =>
            taskType == 'get_position' && (aimValue.value = withSpring(0))
          }
          onCameraPositionChange={onCameraPositionChange}>
          <MapMarker pos={userPos} onPress={onMarkerPress} isUser />
          {taskType == 'show_on_map' && (
            <MapMarker pos={placePos} onPress={onMarkerPress} />
          )}
        </YaMap>
      )}

      {taskType == 'get_position' && <MapAim animValue={aimValue} />}
      <MapHeader
        text={placeName || undefined}
        onBackPress={() => navigation.goBack()}
      />
      <MapControl
        buttonText={
          taskType === 'get_position'
            ? t('choose_place')
            : t('show_on_navigator')
        }
        zoomUp={zoomUp}
        zoomDown={zoomDown}
        focuseOnUserLocation={focuseOnUserLocation}
        onBottomButtonPress={onBottomButtonPress}
      />
      {taskType === 'show_on_map' && (
        <MapShareModal
          isVisible={isMapLink}
          setVisible={setMapLink}
          userPos={userPos}
          placePos={placePos}
          title={placeName}
        />
      )}
    </View>
  );
};

export default MapScreen;
