import { Route } from "react-router";
import "./app.css";
import CounterContainer from "./containers/counterContainer";
import PostListContainer from "./containers/postListContainer";
import PostListpage from "./pages/postListpage";
import PostPage from "./pages/postPage";

function App() {
  return (
    <div>
      <Route path="/" component={PostListpage} exact></Route>
      <Route path="/:id" component={PostPage}></Route>
    </div>
  );
}

export default App;
