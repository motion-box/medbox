import React from 'react';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigation';
import store from './src/store/store';
import './i18n.config';
import {MenuProvider} from 'react-native-popup-menu';
import PreloaderModal from './src/components/global_components/preloader_modal';

// TODO: Add and translate all texts in Welcome screens
// TODO: Locolize all permissions for IOS

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <RootNavigator />
        <PreloaderModal />
      </MenuProvider>
    </Provider>
  );
};

export default App;
