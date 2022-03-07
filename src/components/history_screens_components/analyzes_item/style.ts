import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalet.white100,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  services_cont: {
    borderRadius: 5,
    backgroundColor: colorPalet.bgColor,
    marginBottom: 10,
  },
  services_item: {
    padding: 10,
    borderBottomColor: colorPalet.black20,
  },
});

export default styles;
