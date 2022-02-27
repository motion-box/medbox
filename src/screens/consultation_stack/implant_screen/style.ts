import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalet.white100,
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: colorPalet.black100,
    fontFamily: fonts.sf_bold,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: colorPalet.black50,
    fontFamily: fonts.sf_medium,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bottom_cont: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginHorizontal: 20,
  },
});

export default styles;
