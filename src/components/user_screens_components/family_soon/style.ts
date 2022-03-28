import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    borderRadius: 10,
  },
  text_cont: {
    width: '40%',
    height: '100%',
    position: 'absolute',
    left: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
    color: colorPalet.white100,
  },
  soon: {
    fontSize: 16,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
  },
});

export default styles;
