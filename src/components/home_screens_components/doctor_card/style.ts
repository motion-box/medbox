import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  image_cont: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 5,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: colorPalet.black100,
    fontFamily: fonts.sf_medium,
    marginRight: 10,
  },
  speciality: {
    fontSize: 12,
    color: colorPalet.black50,
    fontFamily: fonts.sf_regular,
  },
  pice: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
});

export default styles;
