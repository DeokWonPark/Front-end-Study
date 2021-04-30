import "./app.scss";
import Button from "./components/button/button";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large">BUTTON</Button>
        <Button>BUTTON</Button>
        <Button size="small">BUTTON</Button>
      </div>

      <div className="buttons">
        <Button size="large" color="pink">
          BUTTON
        </Button>
        <Button color="pink">BUTTON</Button>
        <Button size="small" color="pink">
          BUTTON
        </Button>
      </div>

      <div className="buttons">
        <Button size="large" color="grey">
          BUTTON
        </Button>
        <Button color="grey">BUTTON</Button>
        <Button size="small" color="grey">
          BUTTON
        </Button>
      </div>

      <div className="buttons">
        <Button size="large" outline={true}>
          BUTTON
        </Button>
        <Button color="grey" outline>
          BUTTON
        </Button>
        <Button size="small" color="pink" outline={true}>
          BUTTON
        </Button>
      </div>

      <div className="buttons">
        <Button size="large" fullWidth>
          BUTTON
        </Button>
        <Button size="large" color="grey" fullWidth>
          BUTTON
        </Button>

        <Button
          size="large"
          color="pink"
          fullWidth
          onClick={() => {
            console.log("Click");
          }}
          onMouseMove={() => {
            console.log("Move");
          }}
        >
          BUTTON
        </Button>
      </div>
    </div>
  );
}

export default App;
