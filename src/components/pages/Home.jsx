import React, { useEffect } from "react";
import postService from "../../appwrite/postManager";
import PostCard from "../PostCard";
import { Container } from "../../components/Index";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, loadFromLocalStorage, postSetter } from "../../store/postSlice";

function Home() {
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.post.posts); // Redux se posts

  // Load posts from localStorage on mount
  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  // Fetch posts from backend on mount
  useEffect(() => {
    postService.getPosts([]).then((res) => {
      if (res && Array.isArray(res.documents)) {
        dispatch(getPosts(res.documents));
        dispatch(postSetter(res.documents));
      }
    });
  }, [dispatch]);

  if (!reduxPosts || reduxPosts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full md:w-1/2 lg:w-1/3">
              <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-900">
      <Container>
        <div className="flex flex-wrap justify-center">
          {reduxPosts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
