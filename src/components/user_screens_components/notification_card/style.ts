import {fonts} from '../../../resources/style/globalStyle';
import {StyleSheet} from 'react-native';
import {colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // marginTop: 10,
  },
  status: {
    width: 10,
  },
  card_cont: {
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colorPalet.white100,
  },
  content: {
    padding: 10,
    flex: 1,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  doctor_cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctor_image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  doctor_title: {
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
    fontSize: 14,
  },
  description: {
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
    fontSize: 12,
  },
});

export default styles;
