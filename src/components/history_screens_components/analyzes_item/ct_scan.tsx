import React, {useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {useAppSelector} from '../../../hooks/redux';
import {FullscreenIcon} from '../../../resources/icons/icons';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

interface Iprops {
  title: string;
  data: CtScanItemProps;
}

export interface CtScanItemProps {
  images: any[];
}

const CtScan: React.FC<Iprops> = props => {
  const {data, title} = props;
  const {screen} = useAppSelector(state => state.globalReducer);
  const [isVisible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <>
      {data.images.length ? (
        <>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={() => setVisible(true)}>
            <Image
              source={data.images[0]}
              style={[
                styles.image,
                {
                  width: screen.width - 60,
                  height: (screen.width - 60) / 1.77,
                },
              ]}
            />
            <View style={styles.indicator_cont}>
              <Text style={styles.indicator_text}>
                {1}/{data.images.length}
              </Text>
            </View>
            <View style={styles.icon_cont}>
              <FullscreenIcon color={colorPalet.white100} />
            </View>
          </Pressable>
          <ImageView
            images={data.images}
            imageIndex={0}
            visible={isVisible}
            onRequestClose={() => {
              setVisible(false);
              setImageIndex(0);
            }}
            doubleTapToZoomEnabled={true}
            onImageIndexChange={imageIndex => setImageIndex(imageIndex)}
            swipeToCloseEnabled={true}
            FooterComponent={props => (
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: screen.hasNotch ? 43 : 20,
                }}>
                <Text style={{color: '#fff', fontFamily: fonts.sf_semibold}}>
                  {imageIndex + 1}/{data.images.length}
                </Text>
              </View>
            )}
          />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    lineHeight: 24,
    marginBottom: 10,
  },
  image: {
    borderRadius: 5,
  },
  icon_cont: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    backgroundColor: colorPalet.white50,
    right: 10,
    bottom: 10,
  },
  indicator_cont: {
    borderRadius: 10,
    height: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    backgroundColor: colorPalet.white50,
    left: 10,
    bottom: 10,
  },
  indicator_text: {
    fontSize: 12,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.white100,
  },
});

export default CtScan;
