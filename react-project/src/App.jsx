import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import './components/Layout.css';
import ErrorPage from './components/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from './components/Success';

function App() {
  return (
    <>
      <div className="content-section">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/main">
          <Success />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

export default App;
