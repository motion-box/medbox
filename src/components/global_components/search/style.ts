import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  search_container: {
    flex: 1,
    height: 40,
  },
  search: {
    flex: 1,
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 12,
    color: colorPalet.black100,
    fontFamily: fonts.sf_medium,
  },
  icon_cont: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  sort_button: {
    width: 40,
    height: 40,
    backgroundColor: colorPalet.white100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10,
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
