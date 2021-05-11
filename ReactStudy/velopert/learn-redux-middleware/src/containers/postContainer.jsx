import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/post";
import { clearPost, getPost, goToHome } from "../modules/posts";

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId]
  ) || {
    loading: false,
    data: null,
    error: null,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPost(postId));

    // return () => dispatch(clearPost());
  }, [dispatch, postId, data]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈</button>
      <Post post={data}></Post>
    </>
  );
};

export default PostContainer;
