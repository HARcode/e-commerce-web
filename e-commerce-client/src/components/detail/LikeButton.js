import React from "react";

export default function LikeButton({ liked, onLike }) {
  return (
    <button
      type="button"
      className="btn btn-default text-primary"
      onClick={onLike}
    >
      <i className={`fa fa-heart${liked ? "" : "-o"} text-primary mr-1`}></i>
      {liked ? "Liked" : "Like this"}
    </button>
  );
}
