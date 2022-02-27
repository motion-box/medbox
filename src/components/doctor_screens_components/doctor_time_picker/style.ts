import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from './../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 30,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    marginHorizontal: 20,
  },
  date_card_cont: {
    width: 120,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date_card_title: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
  },
  date_card_subtitle: {
    fontSize: 14,
    fontFamily: fonts.sf_regular,
  },
  times_cont: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  times_card_cont: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  times_card_text: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
  },
});

export default styles;
