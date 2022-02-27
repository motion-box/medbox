import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  image_cont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image_box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  add_image_cont: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colorPalet.white50,
  },
  titler: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    lineHeight: 30,
    color: colorPalet.black100,
    marginVertical: 10,
  },
  name_cont: {
    flexDirection: 'row',
  },
});

export default styles;
