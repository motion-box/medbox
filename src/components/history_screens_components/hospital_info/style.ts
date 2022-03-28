import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  image: {
    width: 36,
    height: 36,
    backgroundColor: colorPalet.white100,
    borderRadius: 5,
    marginRight: 5,
  },
  name_cont: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  name_cliper: {
    width: 20,
    height: 18,
    position: 'absolute',
    right: 0,
  },
  price: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
});

export default styles;
