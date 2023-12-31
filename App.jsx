import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import RoutesStack from './src/navigations/RoutesStack';
import {persistor, store} from './src/screens/redux/store';
import Toast from 'react-native-toast-message';
import {StatusBar} from 'react-native';
import colors from './src/constants/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <StatusBar
          backgroundColor={colors.BLACK}
          translucent={true}
          hidden={true}
          barStyle="dark-content"
        />
        <RoutesStack />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
