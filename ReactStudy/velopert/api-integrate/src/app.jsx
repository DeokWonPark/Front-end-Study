import "./app.css";
import { UsersProvider } from "./usersContext";
import UsersReducer from "./usersReducer";

function App() {
  return (
    <UsersProvider>
      <UsersReducer></UsersReducer>
    </UsersProvider>
  );
}

export default App;
