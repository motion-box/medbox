import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    position: 'absolute',
    height: 60,
    borderRadius: 20,
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',
  },
  buttons_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 2.5,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2.5,
  },
});

export default styles;
