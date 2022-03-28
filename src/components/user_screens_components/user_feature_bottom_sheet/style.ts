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
  grad: {
    height: 20,
    position: 'absolute',
    top: 59,
  },
  item: {
    borderRadius: 5,
    backgroundColor: colorPalet.bgColor,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 5,
  },
  item_text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  empt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
