import React from "react";
import PostContainer from "../containers/postContainer";

const PostPage = ({ match }) => {
  const { id } = match.params; //URL파리미터 조회
  return <PostContainer postId={parseInt(id, 10)}></PostContainer>;
};

export default PostPage;
