import {StyleSheet} from 'react-native';
import {fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
  },
});
export default styles;
