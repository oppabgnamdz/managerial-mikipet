import './App.css';
import Header from './component/Header';
import Navigation from './component/Navigation';
function App() {
  return (
    <div className="App">
      <div className="main-flex">
        <Navigation />
        <Header />
      </div>
    </div>
  );
}

export default App;
