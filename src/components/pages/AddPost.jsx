import React from 'react';
import { Container, Postfrom } from '../../components/Index';

function AddPost() {
  return (
    <div className="w-full py-8 bg-black">
      <Container>
        <div className="w-full max-w-4xl mx-auto bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Add New Post</h1>
          <Postfrom />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
