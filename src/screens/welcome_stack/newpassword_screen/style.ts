import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bottom_cont: {
    width: '100%',
    paddingHorizontal: 20,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default styles;
