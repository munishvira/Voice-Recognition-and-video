import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Index from './src/index';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: componentWillReceiveProps']);
LogBox.ignoreLogs(['Warning: componentWillMount']);

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Index />
      </Provider>
    </>
  );
}
