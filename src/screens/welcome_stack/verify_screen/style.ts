import {fonts, colorPalet} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.white100,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    width: '100%',
    color: colorPalet.black100,
    fontFamily: fonts.sf_bold,
    position: 'absolute',
    height: 60,
    opacity: 0,
  },
  input_container: {
    height: 60,
    backgroundColor: colorPalet.white50,
    borderRadius: 10,
    paddingHorizontal: 2.5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  question_text: {
    textAlign: 'center',
    fontSize: 14,
    color: colorPalet.white80,
    fontFamily: fonts.sf_medium,
    marginBottom: 30,
  },
  tab: {
    backgroundColor: colorPalet.white100,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
