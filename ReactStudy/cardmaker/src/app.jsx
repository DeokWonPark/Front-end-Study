import styles from './app.module.css';
import Login from './components/Login/login';
import Maker from './components/maker/maker';
import { BrowserRouter ,Switch, Route} from 'react-router-dom';

function App({authService,FileInput}) {
  return <div className={styles.app}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Login authService={authService}></Login>
        </Route>
        <Route path="/maker">
          <Maker authService={authService} FileInput={FileInput}></Maker>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>;
}

export default App;
