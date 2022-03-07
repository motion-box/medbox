import React, {useState} from 'react';
import {View} from 'react-native';
import Animated, {
  Layout,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Family from '../../../components/user_screens_components/family';
import Header from '../../../components/global_components/header';
import NotificationContainer from '../../../components/user_screens_components/notification_container';
import UserClinic from '../../../components/user_screens_components/user_clinic';
import UserInfo from '../../../components/user_screens_components/user_info';
import {NotificationModel} from '../../../models/NotificationModel';
import {UserModel} from '../../../models/UserModal';
import {colorPalet} from '../../../resources/style/globalStyle';
import {useAppSelector} from '../../../hooks/redux';
import {NavigatorTypes} from '../../../navigation';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const notificationData: NotificationModel[] = [
  {
    id: '0',
    status: 'attention',
    doctor: 'Alisa Miller',
    speciality: 'Cardiologist',
    imageUrl: '',
    date: '2022-12-20-21:00',
    description:
      'You need to be examined by a cardiologist to check the condition of the heart on the recommendation of a doctor',
  },
  {
    id: '1',
    status: 'idle',
    doctor: 'Azamat Alimov',
    speciality: 'Cardiologist',
    imageUrl: '',
    date: '2022-04-12-19:00',
    description:
      'You need to be examined by a cardiologist to check the condition of the heart on the recommendation of a doctor',
  },
  {
    id: '2',
    status: 'warning',
    doctor: 'Ulugbek Alimov',
    speciality: 'Cardiologist',
    imageUrl: '',
    date: '2022-10-15-10:00',
    description:
      'You need to be examined by a cardiologist to check the condition of the heart on the recommendation of a doctor',
  },
];
const userData: UserModel = {
  name: 'Alisa Miller',
  email: 'alisamiller@gmail.com',
  imageUrl: '',
  userInfo: {
    bloodType: 'O (3) +',
    age: 18,
    sex: 'female',
    address: 'Yakkasaray district, st. Ivleeva, 10',
  },
  family: [
    {id: '0', name: 'Anna Miller', age: 1, imageUrl: ''},
    {id: '1', name: 'Brain Miller', age: 7, imageUrl: ''},
    {id: '2', name: 'Richard Miller', age: 24, imageUrl: ''},
    {id: '3', name: 'Milisa Miller', age: 12, imageUrl: ''},
  ],
  clinic: {
    name: 'Clinic №23',
    doctor: {
      name: 'Alisa Miller',
      imageUrl: '',
      speciality: 'Cardiologist',
    },
  },
};

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

export default function AccountScreen({navigation}: ScreenProps) {
  const {screen} = useAppSelector(state => state.globalReducer);
  const scrollY = useSharedValue(0);
  const [notifData, setNotifData] =
    useState<NotificationModel[]>(notificationData);
  const [user, setUser] = useState(userData);

  const deleteNotificationCardById = (id: string) => {
    const data = [...notifData];
    let filteredArray = data.filter(e => e.id !== id);
    setNotifData([...filteredArray]);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <View
      style={{
        backgroundColor: colorPalet.bgColor,
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: colorPalet.bgColor,
          flex: 1,
          marginTop: screen.hasNotch ? 44 : screen.headerSize || 20,
        }}>
        <StatusBarFocus
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Header
          scrollY={scrollY}
          options={{
            title: 'Smariddin Salohiddinov',
            subtitle: 'alisamiller@gmail.com',
            left: {
              backgroundColor: 'white100',
              image: ' ',
              onPress: () => console.log('left'),
            },
            right: {
              backgroundColor: 'white100',
              icon: 'SettingsIcon',
              isGradient: true,
              onPress: () =>
                navigation.navigate(NavigatorTypes.stacks.settingsScreen),
            },
          }}
        />
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          layout={Layout.delay(100)}
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: screen.hasNotch
              ? 154
              : 120 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          <NotificationContainer
            data={notifData}
            remove={deleteNotificationCardById}
          />
          <UserInfo data={user.userInfo} />
          <Family data={user.family} />
          <UserClinic data={user.clinic} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}
