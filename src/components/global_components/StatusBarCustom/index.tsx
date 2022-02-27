import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const StatusBarFocus: React.FC<StatusBarProps> = props => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} animated={true} /> : null;
};
export default StatusBarFocus;
