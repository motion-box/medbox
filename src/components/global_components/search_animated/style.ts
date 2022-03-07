import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    marginHorizontal: 20,
  },
  input: {
    height: '100%',
    paddingHorizontal: 38,
  },
  icons_cont: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
  },
  close_btn: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default styles;
