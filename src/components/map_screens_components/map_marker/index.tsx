import React from 'react';
import {Marker} from 'react-native-yamap';

interface Iprops {
  pos: PosType;
  onPress: (pos: PosType) => void;
  isUser?: true;
}
type PosType = {latitude: number; longitude: number};

const MapMarker = ({pos, onPress, isUser}: Iprops) => (
  <Marker
    point={{lat: pos.latitude, lon: pos.longitude}}
    source={
      isUser
        ? require('../../../resources/images/map_images/map_user.png')
        : require('../../../resources/images/map_images/map_place.png')
    }
    scale={1}
    anchor={{x: 0.5, y: 1}}
    onPress={() => onPress(pos)}
  />
);

export default MapMarker;
