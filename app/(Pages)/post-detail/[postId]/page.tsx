import React from "react";
import ClientComponent from "../clientComponent";

const page = ({ params }: { params: { postId: string } }) => {
  const postId = parseInt(params.postId, 10);

  return (
    <>
      <ClientComponent postId={postId} />
    </>
  );
};

export default page;
