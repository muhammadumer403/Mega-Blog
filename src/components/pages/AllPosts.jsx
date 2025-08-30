import React, { useEffect } from 'react';
import { Container, PostCard } from "../../components/Index";
import postService from '../../appwrite/postManager';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, loadFromLocalStorage, postSetter } from '../../store/postSlice';

function AllPosts() {
  const dispatch = useDispatch();
  const reduxPosts = useSelector((state) => state.post.posts); // Redux posts
  

  // Load posts from localStorage on mount
  useEffect(() => {
    dispatch(loadFromLocalStorage());
    console.log(reduxPosts)
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
    <div className="w-full py-8 bg-gray-900">
      <Container>
        <div className="flex flex-wrap justify-center">
          {reduxPosts && reduxPosts.length > 0 ? (
            reduxPosts.map((post) => (
              <div key={post.$id} className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <PostCard {...post}  />
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
