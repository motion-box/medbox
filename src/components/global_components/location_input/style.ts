import {fonts, colorPalet} from './../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    flex: 1,
    marginRight: 10,
  },
});

export default styles;
