import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 2.5,
    borderRadius: 10,
  },
  button: {
    height: 30,
    flex: 1,
    marginHorizontal: 2.5,
    borderRadius: 5,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: colorPalet.black100,
    borderRadius: 5,
    top: 5,
    height: 40,
    position: 'absolute',
  },
});
export default styles;
