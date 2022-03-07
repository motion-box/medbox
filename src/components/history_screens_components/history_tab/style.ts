import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalet.white100,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 2.5,
    flexDirection: 'row',
  },
  background_item: {
    height: 30,
    backgroundColor: colorPalet.black100,
    marginHorizontal: 5,
    borderRadius: 5,
    top: 5,
    position: 'absolute',
  },
  item: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    marginHorizontal: 2.5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
  },
});

export default styles;
