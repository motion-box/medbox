import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.white100,
    textAlign: 'center',
  },
  phone_region_cont: {
    backgroundColor: colorPalet.white100,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
  },
  phone_region_text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  recover_button: {
    marginVertical: 20,
    alignSelf: 'flex-end',
    height: 20,
  },
  link_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  link_description: {
    fontSize: 14,
    color: colorPalet.white80,
    fontFamily: fonts.sf_medium,
  },
  link_style: {
    fontSize: 14,
    marginLeft: 10,
    textDecorationLine: 'underline',
    color: colorPalet.white100,
    fontFamily: fonts.sf_medium,
  },
});

export default styles;
