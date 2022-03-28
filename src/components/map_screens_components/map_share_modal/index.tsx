import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles, {modalStyle} from './style';
import {Popup} from 'react-native-map-link';
import {useTranslation} from 'react-i18next';
import {CloseCircleIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';

interface Iprops {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
  placePos: AddressType;
  userPos: AddressType;
  title: string;
}
type AddressType = {latitude: number; longitude: number};

const MapShareModal: React.FC<Iprops> = props => {
  const {t} = useTranslation();
  const {isVisible, setVisible, placePos, userPos, title} = props;

  const customHeader = () => {
    return (
      <View style={styles.header_cont}>
        <Text style={styles.header_text}>{`${t(
          'show_on_map',
        )}: ${title}`}</Text>
        <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={0.8}>
          <CloseCircleIcon color={colorPalet.black100} />
        </TouchableOpacity>
      </View>
    );
  };

  const customFooter = () => {
    return <></>;
  };
  return (
    <Popup
      isVisible={isVisible}
      onCancelPressed={() => setVisible(false)}
      onAppPressed={() => setVisible(false)}
      onBackButtonPressed={() => setVisible(false)}
      customHeader={customHeader()}
      customFooter={customFooter()}
      modalProps={{
        animationIn: 'slideInUp',
        animationOut: 'slideOutDown',
        useNativeDriverForBackdrop: true,
        style: {
          justifyContent: 'flex-end',
          padding: 0,
          margin: 0,
        },
      }}
      appsWhiteList={[
        'apple-maps',
        'yandex',
        'yandex-taxi',
        'yandex-maps',
        'google-maps',
        'dgis',
      ]}
      options={{
        title: title,
        latitude: placePos.latitude,
        longitude: placePos.longitude,
        sourceLatitude: userPos.latitude,
        sourceLongitude: userPos.longitude,
        directionsMode: 'car',
      }}
      style={modalStyle}
    />
  );
};

export default MapShareModal;
