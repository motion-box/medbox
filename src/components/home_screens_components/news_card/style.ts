import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: colorPalet.black10,
  },
  content_cont: {
    left: 20,
    top: 20,
    bottom: 20,
    justifyContent: 'space-between',
    zIndex: 1,
    position: 'absolute',
  },
  title: {
    fontFamily: fonts.sf_bold,
    fontSize: 24,
    color: colorPalet.white100,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: fonts.sf_medium,
    fontSize: 12,
    color: colorPalet.white100,
  },

  button: {
    height: 30,
    backgroundColor: colorPalet.white100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button_text: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default styles;
