import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    backgroundColor: colorPalet.white50,
    borderRadius: 65,
    alignSelf: 'center',
    marginVertical: 20,
    padding: 10,
  },
  middle: {
    flex: 1,
    backgroundColor: colorPalet.white50,
    borderRadius: 55,
    padding: 10,
  },
  front: {
    flex: 1,
    backgroundColor: colorPalet.white100,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.sf_bold,
  },
});

export default styles;
