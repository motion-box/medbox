import {StyleSheet, Dimensions} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header_cont: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    marginTop: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    color: colorPalet.black100,
    fontFamily: fonts.sf_semibold,
    fontSize: 24,
  },
  sub_title: {
    color: colorPalet.black50,
    fontFamily: fonts.sf_regular,
    fontSize: 12,
  },
  title_small: {
    color: colorPalet.black100,
    fontFamily: fonts.sf_semibold,
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  content_cont: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  left_cont: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text_cont: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  grad_cont: {
    position: 'absolute',
    bottom: -20,
    width: width,
    height: 20,
  },
  grad: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
