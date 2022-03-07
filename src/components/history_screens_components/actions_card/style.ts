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
    marginBottom: 10,
  },
  line: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status_cont: {
    width: 70,
    height: 20,
    alignSelf: 'flex-end',
    // paddingHorizontal: 18.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  warn_cont: {
    marginTop: 5,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: colorPalet.bgColor,
  },
  warn_color: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 5,
    height: '100%',
    marginRight: 10,
  },
  warn: {
    fontSize: 12,
    color: colorPalet.black50,
    fontFamily: fonts.sf_medium,
  },
});

export default styles;
