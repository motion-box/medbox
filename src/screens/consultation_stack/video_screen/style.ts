import {StyleSheet} from 'react-native';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colorPalet.white50,
    borderRadius: 10,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.sf_bold,
    color: colorPalet.white100,
  },
  call_to: {
    fontSize: 18,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.white100,
  },
  video_container: {
    flex: 1,
  },
  local_video_cont: {
    width: 100,
    height: 150,
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colorPalet.white50,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colorPalet.white100,
  },
  local_video: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    backgroundColor: colorPalet.black100,
  },
  remote_video_cont: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
  },
  remote_video: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});

export default styles;
