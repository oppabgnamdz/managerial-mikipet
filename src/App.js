import './App.css';
import Header from './component/Header';
import Navigation from './component/Navigation';
import Login from './component/Login';
import Home from './component/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { SecuredRoute } from './component/SecretRoute';
function App() {
  return (
    <Router>
      <Switch>
        <SecuredRoute exact path="/home" component={Home}>
        </SecuredRoute>
        <Route exact path="/">
          <Login />
        </Route>
        <Route>
          <Redirect to={{ pathname: '/' }}></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
