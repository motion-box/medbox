import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_cont: {
    position: 'absolute',
    width: '100%',
  },
  title: {
    color: colorPalet.black100,
    fontFamily: fonts.sf_semibold,
    fontSize: 24,
    width: '100%',
  },
  subtitle: {
    color: colorPalet.black50,
    fontFamily: fonts.sf_regular,
    fontSize: 12,
  },
  title_small: {
    color: colorPalet.black100,
    fontFamily: fonts.sf_semibold,
    fontSize: 18,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  grad: {
    width: 20,
    height: '90%',
    position: 'absolute',
    right: -1,
  },

  button: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
