import {fonts} from './../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.sf_semibold,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    zIndex: -1,
  },
});

export default styles;
