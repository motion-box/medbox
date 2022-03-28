import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  top_cont: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  search_cont: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    backgroundColor: colorPalet.white100,
    flex: 1,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  input_text: {
    fontSize: 14,
    color: colorPalet.black20,
    fontFamily: fonts.sf_medium,
  },
  settings_button: {
    width: 40,
    height: 40,
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filter: {
    marginTop: 10,
  },
  filter_intem: {
    height: 30,
    backgroundColor: colorPalet.white100,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  filter_text: {
    fontFamily: fonts.sf_medium,
    color: colorPalet.black50,
    fontSize: 12,
  },
});

export default styles;
