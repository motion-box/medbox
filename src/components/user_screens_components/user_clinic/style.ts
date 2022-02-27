import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalet.white100,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.sf_semibold,
    fontSize: 14,
    color: colorPalet.black100,
  },
  subtitle: {
    fontFamily: fonts.sf_regular,
    fontSize: 12,
    color: colorPalet.black50,
  },
  doctor_cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_cont: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  speciality: {
    fontFamily: fonts.sf_regular,
    fontSize: 10,
    color: colorPalet.black50,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorPalet.black10,
    marginVertical: 10,
  },
});

export default styles;
