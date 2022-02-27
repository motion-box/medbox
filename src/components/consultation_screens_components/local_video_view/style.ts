import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    left: 20,
    position: 'absolute',
  },
  video_cont: {
    width: 100,
    height: 150,
    // position: 'absolute',
    zIndex: 1,
    backgroundColor: colorPalet.white50,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colorPalet.white100,
    marginTop: 10,
  },
  video: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    // position: 'absolute',
    backgroundColor: colorPalet.black100,
  },
  timer_cont: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height: 24,
    borderRadius: 10,
    overflow: 'hidden',
  },
  timer: {
    fontSize: 12,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.white100,
    zIndex: 1,
    marginHorizontal: 10,
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
});
export default styles;
