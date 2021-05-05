import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../todoContext";

const CircleButon = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);

  font-size: 60px;
  color: white;
  border-radius: 40px;

  border: none;
  outline: none;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFromPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const ToDoCreate = (props) => {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const inputRef = useRef(null);

  const onCreate = (e) => {
    e.preventDefault();
    const inputText = inputRef.current && inputRef.current.value;
    dispatch({
      type: "CREATE",
      todo: { id: nextId.current, text: inputText, done: false },
    });
    inputRef.current.value = "";
    setOpen(false);
    nextId.current += 1;
  };
  return (
    <>
      {open && (
        <InsertFromPositioner>
          <InsertForm onSubmit={onCreate}>
            <Input
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              autoFocus
              ref={inputRef}
            ></Input>
          </InsertForm>
        </InsertFromPositioner>
      )}
      <CircleButon onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButon>
    </>
  );
};

export default React.memo(ToDoCreate);