import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  trigger: {
    paddingLeft: 10,
    paddingRight: 5.5,
  },
  container: {
    marginTop: -10,
    width: 160,
    backgroundColor: colorPalet.white100,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  item_cont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: colorPalet.black10,
  },
  item_text: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
});

export default styles;
