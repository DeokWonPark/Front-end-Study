import React, { useState } from 'react';
import produce from 'immer';

const Immercom = (props) => {
  const [state, setState] = useState({
    posts: [
      {
        id: 1,
        title: '제목입니다.',
        body: '내용입니다.',
        comments: [
          {
            id: 1,
            text: '와 정말 잘 읽었습니다.',
          },
        ],
      },
      {
        id: 2,
        title: '제목입니다.',
        body: '내용입니다.',
        comments: [
          {
            id: 2,
            text: '또 다른 댓글 어쩌고 저쩌고',
          },
        ],
      },
    ],
    selectedId: 1,
  });

  const handleClick = () => {
    console.log('Click');
    setState({
      ...state,
      posts: state.posts.map((post) =>
        post.id === 1
          ? {
              ...post,
              comments: post.comments.concat({
                id: 3,
                text: '추가한 댓글',
              }),
            }
          : post,
      ),
    });
  };

  const handleImmerClick = () => {
    console.log('ImmerClick');
    const nextState = produce(state, (draft) => {
      const post = draft.posts.find((post) => post.id === 1);
      post.comments.push({
        id: 3,
        text: '불변라이브러리 텍스트',
      });
    });

    setState(nextState);
  };

  return (
    <>
      {console.log(state)}
      <button onClick={handleClick}>state add</button>
      <button onClick={handleImmerClick}>immer state add</button>
    </>
  );
};

export default Immercom;
