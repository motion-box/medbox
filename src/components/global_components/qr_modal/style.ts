import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colorPalet.white100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  title_text: {
    fontSize: 24,
    color: colorPalet.black100,
    fontFamily: fonts.sf_semibold,
    textAlign: 'center',
    marginBottom: 30,
  },
  subtite_text: {
    fontSize: 14,
    color: colorPalet.black50,
    fontFamily: fonts.sf_regular,
    marginTop: 10,
  },
  button_cont: {
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  preloader: {
    backgroundColor: colorPalet.white50,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  qr_cont: {
    width: 220,
    height: 220,
    borderColor: colorPalet.bgColor,
  },
  qr_place_holder: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colorPalet.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader_cont: {
    width: 220,
    height: 5,
    backgroundColor: colorPalet.bgColor,
    borderRadius: 5,
    marginTop: 30,
    overflow: 'hidden',
  },
});
export default styles;
