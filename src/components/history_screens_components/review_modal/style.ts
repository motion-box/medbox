import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  modal_cont: {
    width: '100%',
    height: '100%',
  },
  backdrop: {
    flex: 1,
    backgroundColor: colorPalet.black50,
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    backgroundColor: colorPalet.white100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title_cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  left_cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },

  head_text: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    lineHeight: 17,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    backgroundColor: colorPalet.bgColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black100,
  },
  bottom_cont: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  lodaer_cont: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalet.white50,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default styles;
