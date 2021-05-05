import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const detail = query.detail === "true";

  return (
    <>
      <h1>
        About
        <p>
          이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.
        </p>
        {detail && <p>추가적인 정보입니다. === detail true</p>}
      </h1>
    </>
  );
};

export default About;
