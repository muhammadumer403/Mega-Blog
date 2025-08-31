import React, { useEffect } from "react";
import { Container, PostCard } from "../../components/Index";
import postService from "../../appwrite/postManager";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  loadFromLocalStorage,
  postSetter,
} from "../../store/postSlice";

function AllPosts() {
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.post.posts); // Redux posts

  // Load posts from localStorage on mount
  useEffect(() => {
    dispatch(loadFromLocalStorage());
    console.log(reduxPosts);
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

  return (
    <div className="w-full py-8 bg-black">
      <Container>
        <div className="flex flex-col space-y-6">
          {reduxPosts && reduxPosts.length > 0 ? (
            reduxPosts.map((post, index) => (
              <div
                key={post.$id}
                className={`flex ${
                  index % 2 === 0 ? "justify-start " : "justify-end "
                }`}
              >
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                  <PostCard idx={index} {...post}  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center text-xl font-semibold text-gray-500">
              No posts available.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
