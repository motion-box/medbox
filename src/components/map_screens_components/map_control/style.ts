import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  bottom_cont: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
  },
  control_button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    shadowColor: colorPalet.black100,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
});
export default styles;
