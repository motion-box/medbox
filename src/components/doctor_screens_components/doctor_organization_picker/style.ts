import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    color: colorPalet.black100,
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
  },
  item_cont: {
    marginVertical: 5,
    height: 50,
    backgroundColor: colorPalet.bgColor,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: colorPalet.black50,
    borderRadius: 6,
  },
  left_side: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_text: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.sf_medium,
  },
  item_image: {
    marginLeft: 10,
    width: 80,
    height: 25,
  },
  price_text: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
  },
});
export default styles;
