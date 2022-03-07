import React, {useEffect, useRef, useState} from 'react';
import {View, PermissionsAndroid, Alert, StatusBar} from 'react-native';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../../../hooks/redux';
//@ts-ignore
import {Voximplant} from 'react-native-voximplant';
import LinearGradient from 'react-native-linear-gradient';
import VideoControlTab from '../../../components/consultation_screens_components/video_contor_tab';
import VideoHeader from '../../../components/consultation_screens_components/video_header';
import LocalVideoView from '../../../components/consultation_screens_components/local_video_view';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];
const callSettings = {
  video: {
    sendVideo: true,
    receiveVideo: true,
  },
};

enum status {
  INITIALIZING = 'call_status_initializing',
  CALLING = 'call_status_calling',
  CONNECTING = 'call_status_connecting',
  CONNECTED = 'call_status_connected',
  ERROR = 'call_status_error',
  EMPTY = '',
}

const VideoScreen = ({navigation, route}: ScreenProps) => {
  const {role, companion} = useAppSelector(state => state.userReducer);
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const voximplant = Voximplant.getInstance();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callState, setCallState] = useState('Idle');
  const call = useRef<any>(null);
  const endpoint = useRef<any>(null);
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const [isVideo, setVideo] = useState(false);
  const [isMicro, setMicro] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!recordAudioGranted || !cameraGranted) {
        Alert.alert('Permission not granted');
      } else {
        setPermissionGranted(true);
      }
    };
    if (os === 'android') {
      requestPermissions();
      makeCall();
    } else {
      setPermissionGranted(true);
      makeCall();
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    voximplant.on(
      Voximplant.ClientEvents.IncomingCall,
      (incomingCallEvent: any) => {
        console.log(incomingCallEvent);
        onIncomeCall(incomingCallEvent.call);
      },
    );

    return () => {
      if (call.current) {
        call.current.off(Voximplant.CallEvents.Failed);
        call.current.off(Voximplant.CallEvents.ProgressToneStart);
        call.current.off(Voximplant.CallEvents.Connected);
        call.current.off(Voximplant.CallEvents.Disconnected);
      }
    };
  }, [permissionGranted]);

  const makeCall = async () => {
    call.current = await voximplant.call(companion?.username, callSettings);
    subscribeToCallEvents();
  };

  const getCall = async (incomingCall: any) => {
    call.current = await incomingCall;
    setTimeout(() => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      incomingCall.answer(callSettings);
    }, 100);
  };

  const subscribeToCallEvents = () => {
    Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(
      Voximplant.Hardware.AudioDevice.SPEAKER,
    );
    call.current.on(Voximplant.CallEvents.Failed, (callEvent: any) => {
      showError(callEvent.reason);
      setCallState('Failed: error ocured');
    });
    call.current.on(
      Voximplant.CallEvents.ProgressToneStart,
      (callEvent: any) => {
        setCallState('calling...');
      },
    );
    call.current.on(Voximplant.CallEvents.Connected, (callEvent: any) => {
      setCallState('Connected');
    });
    call.current.on(Voximplant.CallEvents.Disconnected, (callEvent: any) => {
      setCallState('Disconnected');
    });
    call.current.on(
      Voximplant.CallEvents.LocalVideoStreamAdded,
      (callEvent: any) => {
        setLocalVideoStreamId(callEvent.videoStream.id);
      },
    );
    call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent: any) => {
      endpoint.current = callEvent.endpoint;
      subscribeToEndpointEvent();
    });
  };

  const subscribeToEndpointEvent = async () => {
    endpoint.current.on(
      Voximplant.EndpointEvents.RemoteVideoStreamAdded,
      (endpointEvent: any) => {
        setRemoteVideoStreamId(endpointEvent.videoStream.id);
      },
    );
  };

  const onIncomeCall = (incomingCall: any) => {
    const caller = incomingCall.getEndpoints()[0].displayName;
    Alert.alert('Call', `It is: ${caller}`, [
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => incomingCall.decline(),
      },
      {
        text: 'Accept',
        style: 'default',
        onPress: () => getCall(incomingCall),
      },
    ]);
    // call.current.on(Voximplant.CallEvents.Disconnected, (callEvent: any) => {
    //     setCallState('Disconnected');
    // });
  };

  const onVideoPress = () => {
    setVideo(!isVideo);
  };
  const onHangupPress = () => {
    // call.current.hangup();
    navigation.pop(2);
  };
  const onMicroPress = () => {
    setMicro(!isMicro);
  };

  const showError = (error: string) => {
    Alert.alert('Error ocured', error);
  };

  return (
    <LinearGradient
      colors={['#344853', '#1A1B27']}
      style={{flex: 1}}
      useAngle
      angle={150}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.video_container}>
        <LocalVideoView
          streamId={localVideoStreamId}
          os={os}
          screen={screen}
          isVideo={true}
        />
        <View style={styles.remote_video_cont}>
          <Voximplant.VideoView
            videoStreamId={remoteVideoStreamId}
            scaleType={Voximplant.RenderScaleType.SCALE_FILL}
            style={styles.remote_video}
          />
        </View>
      </View>
      <VideoHeader
        isVideo={false}
        data={{name: 'Alisa Miller', speciality: 'Cardiologist'}}
      />

      <VideoControlTab
        options={{
          leftButton: {
            pressed: isVideo,
            onPress: onVideoPress,
          },
          centerButton: {
            onPress: onHangupPress,
          },
          rightButton: {
            pressed: isMicro,
            onPress: onMicroPress,
          },
        }}
      />
    </LinearGradient>
  );
};

export default VideoScreen;
