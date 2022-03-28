import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';
import {hasNotch} from 'react-native-device-info';

const styles = StyleSheet.create({
  header_cont: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 14,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
});
export const modalStyle = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: hasNotch() ? 55 : 40,
  },
  itemContainer: {
    padding: 0,
    margin: 0,
    height: 50,
    backgroundColor: colorPalet.bgColor,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  image: {
    width: 30,
    height: 30,
    margin: 0,
    padding: 0,
    left: 0,
  },
  itemText: {
    fontSize: 14,
    color: colorPalet.black100,
    fontWeight: '600',
  },
  titleText: {},
  subtitleText: {},
  cancelButtonContainer: {},
  cancelButtonText: {},
  separatorStyle: {
    backgroundColor: 'transparent',
    height: 10,
  },
  activityIndicatorContainer: {},
});

export default styles;
