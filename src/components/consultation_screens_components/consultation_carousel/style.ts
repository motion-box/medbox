import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  card_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
  },
  card_background: {
    flex: 1,
    padding: 20,
    backgroundColor: colorPalet.white20,
    borderRadius: 30,
  },
  card_subtitle: {
    fontSize: 10,
    color: colorPalet.white100,
    textTransform: 'uppercase',
    fontFamily: fonts.sf_bold,
    marginBottom: 5,
  },
  card_title: {
    fontSize: 24,
    color: colorPalet.white100,
    fontFamily: fonts.sf_bold,
    marginBottom: 5,
  },
  card_description: {
    fontSize: 12,
    color: colorPalet.white100,
    fontFamily: fonts.sf_medium,
  },
  card_circle: {
    position: 'absolute',
    backgroundColor: colorPalet.white20,
    width: 250,
    height: 250,
    borderRadius: 125,
    right: -20,
    bottom: 45,
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
