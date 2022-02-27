import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  input: {
    paddingHorizontal: 20,
    fontFamily: fonts.sf_medium,
    height: 50,
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 17,
    zIndex: 1,
  },
});
export default styles;
