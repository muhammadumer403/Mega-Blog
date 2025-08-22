import React, { useEffect, useState } from 'react';
import { Container, PostCard } from "../../components/Index";
import postService from '../../appwrite/postManager';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8 bg-gray-900">
      <Container>
        <div className="flex flex-wrap justify-center">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <PostCard {...post} />
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
