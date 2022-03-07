import {StyleSheet} from 'react-native';
import {fonts, colorPalet} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 1,
  },
  left_side: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
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
  grad: {
    width: 20,
    height: 16,
    position: 'absolute',
    right: -1,
    top: 0,
  },

  right_side: {
    justifyContent: 'center',
    marginLeft: 10,
  },

  // Bold first view
  bold_first: {},
  bold_first_view_title: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
    textAlign: 'right',
  },
  bold_first_view_subtitle: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
    textAlign: 'right',
  },
  bold_second_view_title: {
    fontSize: 12,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black50,
    textAlign: 'right',
  },
  bold_second_view_subtitle: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
    textAlign: 'right',
    marginTop: 4,
  },

  // Centered view
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  options_cont: {
    marginLeft: 10,
    marginRight: 5.5,
  },
  centered_text: {
    fontSize: 12,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
  },
  modal: {
    zIndex: 100,
    position: 'absolute',
    top: -10,
    right: 0,
    backgroundColor: colorPalet.white100,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  modal_item_cont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: colorPalet.black10,
  },
  modal_item_text: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
});

export default styles;
