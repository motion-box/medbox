import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  spacer: {
    height: 20,
  },
  titler: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    lineHeight: 30,
  },
  grad: {
    height: 20,
    position: 'absolute',
    top: 124,
  },
  bottom_cont: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    paddingHorizontal: 20,
  },
});

export default styles;
