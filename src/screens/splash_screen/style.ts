import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalet.black100,
  },
  powered: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    color: colorPalet.white20,
    fontSize: 12,
    fontFamily: fonts.sf_regular,
  },
});

export default styles;
