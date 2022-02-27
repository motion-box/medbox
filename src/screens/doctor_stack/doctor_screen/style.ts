import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalet.bgColor,
    paddingHorizontal: 20,
  },
  bottom_cont: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default styles;
