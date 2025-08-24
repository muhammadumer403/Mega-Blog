import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../../appwrite/postManager";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../Container/Container";
import {  Filedel, getFilePreview, getPost, postDel, postSetter } from "../../store/postSlice";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userID === userData.$id : false;
  const dispatch = useDispatch();
  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug))
      postService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          dispatch(postSetter(post));
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    postService.deletePost(post.$id).then((status) => {
      dispatch(postDel(status));
      if (status) {
        postService.deleteFile(post.featuredImage);
        dispatch(Filedel(post.featuredImage));
        navigate("/");
        
      }
      
    });
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-900">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-gray-800 shadow-lg">
          <img
            src={
              post.featuredImage
                ? (postService.getFilePreview(post.featuredImage) && dispatch(getFilePreview(post.featuredImage)))
                : "/default-image.jpg"
            }
            alt={post.title}
            className="rounded-xl w-full h-64 object-cover"
          />
          {isAuthor && (
            <div className="absolute right-6 z-40 top-6 space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <div className="browser-css text-white">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
}
