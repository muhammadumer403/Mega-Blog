import React, { useEffect, useState } from 'react';
import { Container, Postfrom } from "../../components/Index";
import postService from '../../appwrite/postManager';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate('/'); // Redirect if post is not found
        }
      });
    } else {
      navigate('/'); // Redirect if no slug is provided
    }
  }, [slug, navigate]);

  return post ? (
    <div className="w-full py-8">
      <Container>
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          <h2 className="text-center text-2xl font-bold leading-tight">Edit Post</h2>
          <Postfrom post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
}

export default EditPost;
