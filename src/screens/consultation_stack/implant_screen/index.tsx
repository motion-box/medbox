import React, {useEffect} from 'react';
import {Alert, View, Text} from 'react-native';
// @ts-ignore
import {Voximplant} from 'react-native-voximplant';
import {userSlice} from '../../../store/reducers/UserSlice';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './style';
import Button from '../../../components/global_components/button';

const APP_NAME = 'medbox';
const ACC_NAME = 'medbox';

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params: {};
  };
}

const ImplantScreen = ({navigation}: ScreenProps) => {
  const dispatch = useAppDispatch();
  const {setUserRole, setCompanion} = userSlice.actions;
  const {screen, os} = useAppSelector(state => state.globalReducer);
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      console.log(status);
      if (status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
        await signIn();
      } else if (status === Voximplant.ClientState.LOGGED_IN) {
        setTimeout(() => {
          goVideoScreen();
        }, 1000);
      }
    };
    connect();
  }, []);

  const goVideoScreen = () => {
    if (os === 'ios') {
      dispatch(setUserRole('doctor'));
      dispatch(
        setCompanion({
          username: 'test_client',
          display_name: 'Client',
        }),
      );
    } else {
      dispatch(setUserRole('client'));
      dispatch(
        setCompanion({
          username: 'test_doctor',
          display_name: 'Doctor',
        }),
      );
    }
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'VideoScreen',
        },
      ],
    });
  };

  const signIn = async () => {
    let username, password;
    if (os === 'ios') {
      username = 'test_doctor';
      password = '!kBmtD40';
    } else {
      username = 'test_client';
      password = 'H"P4lVZz';
    }
    try {
      console.log(username, password);
      const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(fqUsername, password);
      setTimeout(() => {
        goVideoScreen();
      }, 1000);
    } catch (e: any) {
      console.log(e);
      Alert.alert(e.name, `Error code: ${e.code}`);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: screen.width - 40,
          height: screen.width - 40,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>ANIMATION</Text>
      </View>
      <Text style={styles.title}>Alisa Miller</Text>
      <Text style={styles.description}>
        You can find the doctor you need and consult with him about your health
        problems
      </Text>
      <View
        style={[
          styles.bottom_cont,
          {
            marginBottom: screen.hasNotch ? 33 : 20,
          },
        ]}>
        <Button
          text="cancel"
          onPress={() => navigation.goBack()}
          options={{
            buttonWidth: '100%',
            buttonHeight: 50,
            textSize: 14,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};
export default ImplantScreen;
