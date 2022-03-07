import {StyleSheet, Dimensions} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: colorPalet.bgColor,
    // borderWidth: 1,
  },
  header_cont: {
    // borderWidth: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    flexDirection: 'row',
    marginTop: 0,
    paddingHorizontal: 20,
  },
  grad_cont: {
    position: 'absolute',
    bottom: -20,
    width: width,
    height: 20,
  },
  grad: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
