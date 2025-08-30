import React from 'react';
import { Link } from 'react-router-dom';
import postService from '../appwrite/postManager';

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="w-full sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw] p-4">
      <Link to={`/post/${$id}`} aria-label={`Read more about ${title}`}>
        <div className="w-full bg-gray-800 rounded-xl p-4 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <div className="w-full mb-4">
            <img
             src={featuredImage ? postService.getFilePreview(featuredImage).toString() : '/default-image.jpg'}
              alt={title || 'Post Image'}
              className="rounded-xl w-full h-48 object-cover"
              loading="lazy"
            />
          </div>
          <h2 className="text-xl font-bold text-white truncate">{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
