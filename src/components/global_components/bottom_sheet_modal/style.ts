import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    backgroundColor: colorPalet.black20,
    flexDirection: 'row',
  },
  modal_cont: {
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: colorPalet.white100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default styles;
