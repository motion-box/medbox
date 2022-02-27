import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
    textAlign: 'center',
    marginBottom: 20,
    // marginHorizontal: 20,
  },
});

export default styles;
