import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
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
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorPalet.bgColor,
  },
  radio_cont: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    borderWidth: 1.5,
    borderColor: colorPalet.black50,
    width: 12,
    height: 12,
    borderRadius: 8,
  },
  item_text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
  },
  spacer: {
    height: 10,
  },
});

export default styles;
