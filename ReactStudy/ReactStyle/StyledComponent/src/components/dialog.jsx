import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Button from "./button";

const fadeIn = keyframes`
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
`;
const slideIn = keyframes`
    from{
        transform: translateY(200px);
    }
    to{
        transform: translateY(0px);
    }
`;

const fadeOut = keyframes`
    from{
        opacity:1;
    }
    to{
        opacity:0;
    }
`;
const slideOut = keyframes`
    from{
        transform: translateY(0px);
    }
    to{
        transform: translateY(200px);
    }
`;

const DarkBackground = styled.div`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.25s ease-out;
  animation-fill-mode: forwards;

  ${(props) =>
    props.disapper &&
    css`
      animation: ${fadeOut} 0.25s ease-out;
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  animation: ${slideIn} 0.25s ease-out;
  animation-fill-mode: forwards;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  ${(props) =>
    props.disapper &&
    css`
      animation: ${slideOut} 0.25s ease-out;
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const ShortMarginButton = styled(Button)`
  & + & {
    margin-left: 0.5rem;
    margin-top: 0;
  }
`;

const Dialog = ({
  title,
  children,
  confirmText,
  cancelText,
  visible,
  onConfirm,
  onCancel,
}) => {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    //visible true => false
    console.log(visible, localVisible);
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [visible, localVisible]);

  if (!localVisible && !animate) return null;
  return (
    <DarkBackground disapper={!visible}>
      <DialogBlock disapper={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onConfirm}>
            {confirmText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
};

Dialog.defalutProps = {
  confirmText: "확인",
  cancelText: "취소",
};

export default Dialog;
