import React, {useEffect, useState} from 'react';
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
import {colorPalet} from '../../../resources/style/globalStyle';
import {useAppSelector} from '../../../hooks/redux';
import {NavigatorTypes} from '../../../navigation';
import StatusBarFocus from '../../../components/global_components/StatusBarCustom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UserFeatureButtons from '../../../components/user_screens_components/User_feature_buttons';
import UserFeatureBottomSheet from '../../../components/user_screens_components/user_feature_bottom_sheet';
import FamilySoon from '../../../components/user_screens_components/family_soon';

// const notificationData: NotificationModel[] = [
//   {
//     id: '0',
//     status: 'attention',
//     doctor: 'Alisa Miller',
//     speciality: 'Cardiologist',
//     imageUrl: '',
//     date: '2022-12-20-21:00',
//     description:
//       'You need to be examined by a cardiologist to check the condition of the heart on the recommendation of a doctor',
//   },
//   {
//     id: '1',
//     status: 'idle',
//     doctor: 'Azamat Alimov',
//     speciality: 'Cardiologist',
//     imageUrl: '',
//     date: '2022-04-12-19:00',
//     description:
//       'You need to be examined by a cardiologist to check the condition of the heart on the recommendation of a doctor',
//   },
//   {
//     id: '2',
//     status: 'warning',
//     doctor: 'Ulugbek Alimov',
//     speciality: 'Cardiologist',
//     imageUrl: '',
//     date: '2022-10-15-10:00',
//     description:
//       'You need to be examined by a cardiologist to check the condition of the heart on the recommendation of a doctor',
//   },
// ];

// const family = [
//   {id: '0', name: 'Anna Miller', age: 1, imageUrl: ''},
//   {id: '1', name: 'Brain Miller', age: 7, imageUrl: ''},
//   {id: '2', name: 'Richard Miller', age: 24, imageUrl: ''},
//   {id: '3', name: 'Milisa Miller', age: 12, imageUrl: ''},
// ];

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: {
    params?: {};
  };
}

export default function AccountScreen({navigation}: ScreenProps) {
  const {screen} = useAppSelector(state => state.globalReducer);
  const {userData, accessData} = useAppSelector(state => state.userReducer);
  const scrollY = useSharedValue(0);
  const [isModal, setModal] = useState(false);
  const [modalType, setModalType] = useState<'pathology' | 'allergy'>(
    'pathology',
  );

  // const [notifData, setNotifData] =
  //   useState<NotificationModel[]>(notificationData);

  // const deleteNotificationCardById = (id: string) => {
  //   const data = [...notifData];
  //   let filteredArray = data.filter(e => e.id !== id);
  //   setNotifData([...filteredArray]);
  // };

  const featurePress = (type: 'pathology' | 'allergy') => {
    setModalType(type);
    setModal(true);
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
            title: `${userData?.first_name} ${userData?.last_name}`,
            subtitle: userData?.email,
            left: {
              backgroundColor: 'white100',
              image: userData?.photo,
              onPress: () => null,
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
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: screen.hasNotch
              ? 154
              : 120 + (screen.headerSize || 20),
          }}
          style={{zIndex: -1, flex: 1, top: 40}}
          showsVerticalScrollIndicator={false}>
          {/* <NotificationContainer
            data={notifData}
            remove={deleteNotificationCardById}
          /> */}
          <UserInfo
            data={{
              blood_type: userData!.blood_type,
              birth_date: userData!.birth_date,
              gender: userData!.gender,
              address: userData!.address,
            }}
          />
          {/* <Family data={family} /> */}
          <View style={{height: 20}} />
          <UserFeatureButtons isModal={isModal} setModal={featurePress} />
          <UserClinic
            data={{
              //@ts-ignore
              doctor: userData?.doctor,
              clinic: userData?.clinic,
            }}
          />
          <FamilySoon />

          {isModal && (
            <UserFeatureBottomSheet
              type={modalType}
              isVisible={isModal}
              setVisible={setModal}
            />
          )}
        </Animated.ScrollView>
      </View>
    </View>
  );
}
