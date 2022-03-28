import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    marginHorizontal: 20,
  },
  doctor_cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_cont: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: colorPalet.bgColor,
  },
  text_cont: {
    marginLeft: 5,
  },
  doctor_name: {
    fontSize: 18,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  doctor_speciality: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  info_cont: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: colorPalet.bgColor,
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  info_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  info_text: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
    marginLeft: 10,
  },
  places_cont: {
    marginTop: 10,
    height: 70,
  },
  places_item_cont: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalet.white100,
    marginHorizontal: 5,
    height: 70,
    overflow: 'hidden',
    borderRadius: 10,
  },
  places_item_name: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    lineHeight: 24,
  },
  places_item_image: {
    width: 77,
    height: 24,
  },
  places_item_price: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black50,
  },
  about_cont: {
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
  },
  holder_cont: {
    marginTop: 10,
    marginHorizontal: 20,
    height: 70,
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holder_text: {
    fontSize: 14,
    color: colorPalet.black50,
    fontFamily: fonts.sf_medium,
  },
});

export default styles;
