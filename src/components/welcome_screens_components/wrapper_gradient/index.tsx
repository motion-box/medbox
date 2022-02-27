import React, {Children} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import WrapperKeyboard from '../wrapper_keyboard';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet} from '../../../resources/style/globalStyle';
import {useAppSelector} from '../../../hooks/redux';

const WrapperGradient: React.FC = ({children}) => {
  const {screen, os} = useAppSelector(state => state.globalReducer);
  return (
    <WrapperKeyboard>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <LinearGradient
        colors={colorPalet.brandGradient}
        start={{x: -0.5, y: -0.5}}
        end={{x: 2, y: 2}}
        useAngle={true}
        angleCenter={{x: 0.5, y: 0.5}}
        angle={100}
        style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: os === 'android' ? screen.headerSize || 0 : 0,
          }}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    </WrapperKeyboard>
  );
};
export default WrapperGradient;
