import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  card_container: {
    position: 'absolute',
    margin: 20,
    width: '100%',
    height: '100%',
    backgroundColor: colorPalet.white100,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  card_background: {
    flex: 1,
    padding: 20,
    backgroundColor: colorPalet.white20,
  },
  card_circle: {
    position: 'absolute',
    backgroundColor: colorPalet.white20,
    width: 400,
    height: 400,
    borderRadius: 200,
    alignSelf: 'center',
    bottom: -200,
  },
  text_cont: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: fonts.sf_bold,
    fontSize: 36,
    color: colorPalet.white100,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.sf_medium,
    fontSize: 14,
    color: colorPalet.white100,
    textAlign: 'center',
    marginTop: 10,
  },
  pagination_cont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  pagination_dot: {
    marginHorizontal: 2.5,
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: colorPalet.white50,
  },
});

export default styles;
