import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  header_cont: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    shadowColor: colorPalet.black100,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  header_text: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    marginHorizontal: 20,
  },
});
export default styles;
