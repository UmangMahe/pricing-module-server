import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { APP_BASE_URL, THEME_CONFIG } from './configs/AppConfig';

const themes = {
  dark: `${APP_BASE_URL}/css/dark-theme.css`,
  light: `${APP_BASE_URL}/css/light-theme.css`,
};

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme} insertionPoint="styles-insertion-point">
          <Router basename={APP_BASE_URL}>
            <Switch>
              <Route path="/" component ={Views}/>
            </Switch>
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
