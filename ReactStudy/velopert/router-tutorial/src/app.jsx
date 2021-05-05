import { Route } from "react-router";
import { Link, Switch } from "react-router-dom";
import About from "./about";
import "./app.css";
import Home from "./home";
import HistorySample from "./Others/historySample";
import Profiles from "./parameter/Profiles";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/profiles/" component={Profiles}></Route>
        <Route path="/history" component={HistorySample}></Route>
        <Route
          render={({ location }) => {
            return (
              <div>
                <h2>이 페이지는 존재하지 않습니다.</h2>
                <p>{location.pathname}</p>
              </div>
            );
          }}
        ></Route>
      </Switch>
    </>
  );
}

export default App;
