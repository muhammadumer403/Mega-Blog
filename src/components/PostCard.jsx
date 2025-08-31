import React from "react";
import { Link } from "react-router-dom";
import postService from "../appwrite/postManager";

function PostCard(props) {
  const { $id, title, featuredImage, idx }= props
  console.log(idx)
  return (
    <div className="w-full  p-4">
      <Link to={`/post/${$id}`} aria-label={`Read more about ${title}`}>
        <div className={`flex  rounded-2xl bg-zinc-800 w-[45vmax] ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}  p-4 space-x-4 space-x-reverse hover:scale-[1.02] transition-transform duration-300 ease-in-out`}>
          <div
            className={`w-full mb-4 ${
              idx % 2 === 0 ? "order-2" : "order-1"
            } `}
          >
            <img
              src={
                featuredImage
                  ? postService.getFilePreview(featuredImage).toString()
                  : "/default-image.jpg"
              }
              alt={title || "Post Image"}
              className="rounded-xl w-fit h-[20vmax] object-cover shadow-lg"
              loading="lazy"
            />
          </div>
          <h2
            className={`text-xl font-bold text-white truncate ${
              idx % 2 ? "order-1" : "order-2"
            }`}
          >
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
