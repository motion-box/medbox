import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: colorPalet.white100,
    borderRadius: 10,
  },
  line: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    width: '100%',
    borderBottomColor: colorPalet.black10,
    borderBottomWidth: 0.5,
    marginVertical: 10,
  },
  gradient_cont: {
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  blud_text: {
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
    fontSize: 12,
  },
  title: {
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    fontSize: 14,
  },
  subtitle: {
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
    fontSize: 12,
  },
});

export default styles;
