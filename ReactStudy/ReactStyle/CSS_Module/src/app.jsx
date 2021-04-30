import { useState } from "react";
import "./app.css";
import CheckBox from "./components/checkBox";

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <div className="globalStyle">
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
    </div>
  );
}

export default App;
