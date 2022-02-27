import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  head_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titler: {
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    fontSize: 14,
    lineHeight: 16,
  },
  spacer: {
    height: 10,
  },
});

export default styles;
