import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../../../hooks/redux';
import {
  MinusIcon,
  NavigationIcon,
  PlusIcon,
} from '../../../resources/icons/icons';
import Button from '../../global_components/button';
import styles from './style';

interface Iprops {
  zoomUp: () => void;
  zoomDown: () => void;
  focuseOnUserLocation: () => void;
  onBottomButtonPress: () => void;
  buttonText: string;
}

const MapControl: React.FC<Iprops> = props => {
  const {screen} = useAppSelector(state => state.globalReducer);
  const {
    zoomUp,
    zoomDown,
    focuseOnUserLocation,
    onBottomButtonPress,
    buttonText,
  } = props;
  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.bottom_cont,
        {
          bottom: screen.hasNotch ? 43 : 20,
        },
      ]}>
      <TouchableOpacity
        style={styles.control_button}
        activeOpacity={0.8}
        onPress={zoomUp}>
        <PlusIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.control_button}
        activeOpacity={0.8}
        onPress={zoomDown}>
        <MinusIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.control_button}
        activeOpacity={0.8}
        onPress={focuseOnUserLocation}>
        <NavigationIcon isGradient />
      </TouchableOpacity>
      <Button
        text={buttonText}
        icon="RoadMapIcon"
        onPress={onBottomButtonPress}
        options={{
          buttonWidth: '100%',
          buttonHeight: 50,
          borderRadius: 10,
          textSize: 14,
        }}
      />
    </View>
  );
};

export default MapControl;
