import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HistoryAnalyzeScreen from '../screens/history_stack/history_analyzes_screen';
import HistoryConsultScreen from '../screens/history_stack/history_consult_screen';
import HistoryPrescriptionScreen from '../screens/history_stack/history_prescription_screen';
import HistoryTab from '../components/history_screens_components/history_tab';
import {useAppSelector} from '../hooks/redux';
import {userSlice} from '../store/reducers/UserSlice';

const Tab = createMaterialTopTabNavigator();

export enum HistoryScreenTypes {
  historyConsultScreen = 'HistoryConsultScreen',
  historyAnalyzesScreen = 'HistoryAnalyzesScreen',
  historyPrescriptionScreen = 'HistoryPrescriptionScreen',
}

const HistoryNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <HistoryTab {...props} />}>
      <Tab.Screen
        name={HistoryScreenTypes.historyConsultScreen}
        component={HistoryConsultScreen}
      />
      <Tab.Screen
        name={HistoryScreenTypes.historyAnalyzesScreen}
        component={HistoryAnalyzeScreen}
      />
      <Tab.Screen
        name={HistoryScreenTypes.historyPrescriptionScreen}
        component={HistoryPrescriptionScreen}
      />
    </Tab.Navigator>
  );
};

export default HistoryNavigator;
