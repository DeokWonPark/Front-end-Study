import "./app.css";
import CounterContainer from "./container/counterContainer";
import TodosContainer from "./container/todosContainer";

function App() {
  return (
    <div>
      <CounterContainer />
      <br />
      <TodosContainer />
    </div>
  );
}

export default App;
