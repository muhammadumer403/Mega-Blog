import React from "react";
import { Link } from "react-router-dom";
import postService from "../appwrite/postManager";
import parse from "html-react-parser";

function PostCard(props) {
  const { $id, title, featuredImage, idx,content }= props
  console.log(idx)
  return (
    <div className="w-full  p-4">
      <Link to={`/post/${$id}`} aria-label={`Read more about ${title}`}>
        <div className={`flex  rounded-2xl p-[2vmax] items-center justify-center gap-[10%] bg-zinc-800 w-[90vmax] h-[25vmax]  ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}  p-4 space-x-4 space-x-reverse hover:scale-[1.02] transition-transform duration-300 ease-in-out`}>
          <div
            className={`w-[40%] mb-4 ${
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
              className="rounded-xl w-full h-[20vmax] object-center shadow-lg"
              loading="lazy"
            />
          </div>
         <div  className={`text-xl font-bold text-white  h-full whitespace-normal w-1/2 flex flex-col align-top justify-start truncate ${
              idx % 2 ? "order-1" : "order-2"
            }`}>
           <h2 className="uppercase whitespace-normal mb-4 text-3xl font-bold w-full"
           
          >
            {title}
          </h2>
          <h2 className="font-light whitespace-normal break-words ">{parse(content)}</h2>
         </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
