import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titler: {
    marginVertical: 10,
    lineHeight: 30,
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
  },
  review_cont: {
    width: '100%',
    backgroundColor: colorPalet.white100,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  review_left_cont: {
    width: 100,
    marginRight: 30,
  },
  numbers_cont: {
    flexDirection: 'row',
    height: 48,
  },
  average_number: {
    lineHeight: 48,
    fontSize: 40,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  overal_number: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    alignSelf: 'flex-end',
    marginBottom: 7,
    marginLeft: 5,
  },
  all_reviews: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black20,
    marginBottom: 10,
  },
  stars_cont: {
    flex: 1,
    justifyContent: 'center',
  },
  line_cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 5,
    backgroundColor: colorPalet.black10,
    flexDirection: 'row',
    borderRadius: 2.5,
  },
  line_text: {
    marginRight: 10,
    fontSize: 10,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black20,
  },
  spacer: {
    height: 5,
  },
  comment: {
    marginTop: 10,
    backgroundColor: colorPalet.white100,
    padding: 10,
    borderRadius: 10,
  },
  comment_text: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  filter_cont: {
    width: '100%',
    marginHorizontal: -5,
    height: 30,
    flexDirection: 'row',
    marginTop: 10,
  },
  filter_button: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter_text: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black50,
  },
});
export default styles;
