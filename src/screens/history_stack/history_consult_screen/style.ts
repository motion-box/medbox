import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalet.bgColor,
  },
  shadow: {
    height: 20,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  preloader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colorPalet.white50,
  },
});
export default styles;
