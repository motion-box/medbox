import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {},
  bottom_cont: {
    marginHorizontal: 20,
  },
  price_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  price_title: {
    fontSize: 16,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  price_amount: {
    fontSize: 16,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    backgroundColor: colorPalet.black50,
  },
});

export default styles;
