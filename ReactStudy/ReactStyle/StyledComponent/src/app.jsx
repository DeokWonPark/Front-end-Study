import "./app.css";
import styled, { css, ThemeProvider } from "styled-components";
import Button from "./components/button";
import Dialog from "./components/dialog";
import { useState } from "react";

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.color};
  border-radius: 50%;
  ${(props) =>
    props.huge &&
    css`
      width: 10rem;
      height: 10rem;
    `}
`;

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const palette = {
  blue: "#228be6",
  pink: "#496057",
  gray: "#f06595",
};

function App() {
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };

  const onConfirm = () => {
    setDialog(false);
  };
  const onCancel = () => {
    setDialog(false);
  };

  return (
    <ThemeProvider theme={{ palette }}>
      <>
        <Circle color="blue" huge></Circle>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button color="gray">BUTTON</Button>
            <Button color="pink" size="small">
              BUTTON
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button size="large" outline>
              BUTTON
            </Button>
            <Button color="gray" outline>
              BUTTON
            </Button>
            <Button color="pink" size="small" outline>
              BUTTON
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button size="large" fullWidth>
              BUTTON
            </Button>
            <Button color="gray" size="large" fullWidth>
              BUTTON
            </Button>
            <Button color="pink" size="large" fullWidth onClick={onClick}>
              BUTTON
            </Button>
          </ButtonGroup>
        </AppBlock>

        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={onConfirm}
          onCancel={onCancel}
          visible={dialog}
        >
          데이터를 정말로 삭제하시겠습니까???
        </Dialog>
      </>
    </ThemeProvider>
  );
}

export default App;
