import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

interface Iprops {
  isVideo: boolean;
  data: {
    name: string;
    speciality: string;
  };
}

const VideoHeader: React.FC<Iprops> = ({isVideo, data}) => {
  const {name, speciality} = data;
  const {screen} = useAppSelector(state => state.globalReducer);
  return (
    <View
      style={[
        styles.container,
        {top: screen.hasNotch ? 44 : screen.headerSize || 20},
      ]}>
      <Text
        style={[
          styles.name,
          {
            color: isVideo ? colorPalet.black100 : colorPalet.white100,
          },
        ]}>
        {name}
      </Text>
      <Text
        style={[
          styles.speciality,
          {color: isVideo ? colorPalet.black50 : colorPalet.white50},
        ]}>
        {speciality}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    marginTop: 2.5,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.sf_semibold,
  },
  speciality: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
  },
});

export default VideoHeader;
