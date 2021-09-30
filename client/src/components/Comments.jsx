import React from "react";

export default function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <p>{comment.comment}</p>
          <p>{comment.created}</p>
          <p>{comment.post_id}</p>
        </div>
      ))}
    </div>
  );
}
