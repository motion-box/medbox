import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  date_cont: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: colorPalet.white100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  date_text: {
    fontFamily: fonts.sf_medium,
    color: colorPalet.black50,
    fontSize: 12,
    lineHeight: 16,
  },
});

export default styles;
