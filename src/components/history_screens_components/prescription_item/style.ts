import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colorPalet.white100,
    marginHorizontal: 20,
  },
  medicaments_cont: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colorPalet.bgColor,
    borderRadius: 5,
  },
  item_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item_left: {
    marginRight: 10,
  },
  item_name: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  period: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  item_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 12,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  notation: {
    fontSize: 10,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
    marginLeft: 2,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorPalet.black10,
    marginVertical: 5,
  },
});

export default styles;
