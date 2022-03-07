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
});
export default styles;
