import './App.css';
import Header from './component/Header';
import Navigation from './component/Navigation';
import Login from './component/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <div className="App">
            <div className="main-flex">
              <Navigation />
              <Header />
            </div>
          </div>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
