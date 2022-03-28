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

  item_cont: {
    height: 50,
    backgroundColor: colorPalet.bgColor,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  circle: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: colorPalet.black50,
    borderRadius: 6,
  },
  item_text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
    marginLeft: 10,
  },
  spacer: {
    height: 10,
  },
});

export default styles;
