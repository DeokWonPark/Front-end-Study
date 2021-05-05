import React from "react";
import useReactRouter from "use-react-router";

const ReuterHookSample = (props) => {
  const { location, match, history } = useReactRouter();
  console.log({ location, match, history });
  return null;
};

export default ReuterHookSample;
