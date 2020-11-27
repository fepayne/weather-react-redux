import React, { useEffect } from 'react'
import { connect, Provider } from 'react-redux';
import Weather from './components/Weather/Weather';
import store from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';

function App(props) {
  useEffect(() => {
    props.initializeApp()
  }, [props.initialized])

  if (!props.initialized) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
      <Weather></Weather>
  );
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, { initializeApp })(App)

const WeatherJSApp = (props) => {
  return (
    <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider>
  )
}

export default WeatherJSApp