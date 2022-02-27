import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text_cont: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colorPalet.white100,
    fontFamily: fonts.sf_medium,
    marginHorizontal: 20,
  },
  image_cont: {
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: colorPalet.white50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorPalet.white100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
