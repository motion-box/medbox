import {StyleSheet, Dimensions} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  safearea: {
    flex: 1,
    backgroundColor: colorPalet.black20,
    flexDirection: 'row',
  },
  modal_cont: {
    width: width - 40,
    alignSelf: 'flex-end',
    backgroundColor: colorPalet.white100,
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
});

export default styles;
