import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 5,
    aspectRatio: 3 / 1.65,
  },
  grad_cont: {
    borderRadius: 10,
    padding: 20,
    height: '100%',
  },
  content_cont: {
    alignSelf: 'flex-start',
    height: '100%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  title: {
    fontFamily: fonts.sf_bold,
    fontSize: 24,
    color: colorPalet.white100,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: fonts.sf_bold,
    fontSize: 10,
    color: colorPalet.white100,
    marginBottom: 5,
  },
  description: {
    width: '50%',
    fontFamily: fonts.sf_medium,
    fontSize: 12,
    color: colorPalet.white100,
  },
});

export default styles;
