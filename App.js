import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Routes from './src/Routes';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: "https://1defbd8af68a4874a25c6974e3040fd8@o4504135086964736.ingest.sentry.io/4504259504308224",
  enableInExpoDevelopment: false,
  debug: false,
});

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
