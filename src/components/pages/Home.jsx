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
    <div className="w-full py-8 bg-black">
      <Container>
        <div className="flex flex-col gap-6 w-full">
  {reduxPosts.map((post, index) => (
    <div
      key={post.$id}
      className={`w-full flex ${
        index % 2 === 0 ? "justify-start" : "justify-end"
      }`}
    >
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <PostCard {...post} />
      </div>
    </div>
  ))}
</div>

      </Container>
    </div>
  );
}

export default Home;
