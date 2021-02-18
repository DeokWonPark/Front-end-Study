import logo from './logo.svg';
import './App.css';
import { BrowserRouter ,Switch, Route, Link} from 'react-router-dom';
import Home from './components/home';
import Profile from './components/profile';

function App() {
  return <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Switch>
        <Route path={["/","/home"]} exact={true}>
            <Home></Home>
        </Route>
        <Route path="/profile">
            <Profile></Profile>
        </Route>
      </Switch>
    </BrowserRouter>
  
}

export default App;
