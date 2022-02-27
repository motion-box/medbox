import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  buttons_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: colorPalet.white100,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 5,
    borderRadius: 10,
  },
});

export default styles;
