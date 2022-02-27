import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fonts.sf_semibold,
    fontSize: 14,
    color: colorPalet.black100,
  },
  button: {
    height: '100%',
    justifyContent: 'center',
  },
  button_text: {
    fontFamily: fonts.sf_medium,
    fontSize: 12,
    color: colorPalet.black50,
  },
});

export default styles;
