import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Weather from './components/Weather/Weather';
import store from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';

// eslint-disable-next-line no-shadow
function App({ initializeApp, initialized }) {
  useEffect(() => {
    initializeApp();
  }, [initialized]);

  if (!initialized) {
    return <div>loading...</div>;
  }

  return <Weather />;
}

App.propTypes = {
  initializeApp: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const WeatherJSApp = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default WeatherJSApp;
