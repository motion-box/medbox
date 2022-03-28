import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colorPalet.white100,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  left_side: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_cont: {
    marginLeft: 10,
  },
  number_text: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  date_text: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
});

export default styles;
