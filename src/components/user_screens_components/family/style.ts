import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  list: {
    marginTop: 10,
  },
  item_cont: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colorPalet.white100,
    alignItems: 'center',
  },
  image_cont: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  item_title: {
    fontFamily: fonts.sf_semibold,
    fontSize: 14,
    color: colorPalet.black100,
  },
  item_subtitle: {
    fontFamily: fonts.sf_regular,
    fontSize: 12,
    color: colorPalet.black50,
  },
});

export default styles;
