import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: colorPalet.black100,
    fontFamily: fonts.sf_bold,
  },
  line: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status_cont: {
    height: 20,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status_text: {
    fontFamily: fonts.sf_medium,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  doctor_cont: {
    flexDirection: 'row',
  },
  image_cont: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  doctor_text_cont: {
    marginLeft: 5,
  },
  doctor_name: {
    fontSize: 14,
    color: colorPalet.black100,
    fontFamily: fonts.sf_medium,
  },
  doctor_speciality: {
    fontSize: 12,
    color: colorPalet.black50,
    fontFamily: fonts.sf_regular,
  },
  date_cont: {
    marginLeft: 5,
  },
  date: {
    fontSize: 12,
    color: colorPalet.black50,
    textAlign: 'right',
  },
  border: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: colorPalet.black10,
    marginVertical: 5,
  },
});

export default styles;
