import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalet.bgColor,
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
