import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colorPalet.black100,
    fontFamily: fonts.sf_medium,
  },
});

export default styles;
