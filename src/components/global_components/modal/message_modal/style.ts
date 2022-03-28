import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from './../../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: fonts.sf_bold,
    color: colorPalet.black100,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black50,
    marginBottom: 20,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default styles;
