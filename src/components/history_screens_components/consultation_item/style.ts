import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    padding: 10,
    marginHorizontal: 20,
    // borderWidth: 1,
  },
  type_cont: {
    paddingHorizontal: 10,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
});

export default styles;
