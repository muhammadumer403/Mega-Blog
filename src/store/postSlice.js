import { createSlice } from "@reduxjs/toolkit";

// LocalStorage se posts load karne ka helper
const loadPostsFromLocalStorage = () => {
  try {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  } catch (error) {
    console.error("Error loading posts from localStorage", error);
    return [];
  }
};

// LocalStorage mein posts save karne ka helper
const savePostsToLocalStorage = (posts) => {
  try {
    localStorage.setItem("posts", JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving posts to localStorage", error);
  }
};

const initialState = {
  posts: loadPostsFromLocalStorage(), // refresh par bhi data milta rahe
  currentPost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postSetter: (state, action) => {
      state.posts = Array.isArray(action.payload) ? action.payload : [];
      savePostsToLocalStorage(state.posts);
    },

    postCreator: (state, action) => {
      state.posts = Array.isArray(state.posts) ? state.posts : [];
      state.posts.push(action.payload);
      savePostsToLocalStorage(state.posts);
    },

    updatePost: (state, action) => {
      const { title, content, featuredImage, status, userID } = action.payload;
      if (Array.isArray(state.posts)) {
        state.posts = state.posts.map((post) =>
          post.userID === userID
            ? { ...post, title, content, featuredImage, status }
            : post
        );
        savePostsToLocalStorage(state.posts);
      }
    },

    postDel: (state, action) => {
      if (Array.isArray(state.posts)) {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        savePostsToLocalStorage(state.posts);
      }
    },

    getPosts: (state, action) => {
      // sirf backend se aayi documents ko state me dalna
      state.posts = Array.isArray(action.payload.documents)
        ? action.payload.documents
        : [];
      savePostsToLocalStorage(state.posts);
    },

    getPost: (state, action) => {
      if (Array.isArray(state.posts)) {
        const existingPost = state.posts.find(
          (post) => post.$id === action.payload.$id
        );
        state.currentPost = existingPost || null;
      } else {
        state.currentPost = null;
      }
    },

    uploadFile: (state, action) => {
      state.posts.push(action.payload);
      savePostsToLocalStorage(state.posts);
    },

    Filedel: (state, action) => {
      if (Array.isArray(state.posts)) {
        state.posts = state.posts.filter(
          (post) => post.fileId !== action.payload
        );
        savePostsToLocalStorage(state.posts);
      }
    },

    getFilePreview: (state, action) => {
      if (Array.isArray(state.posts)) {
        state.posts.push({ previewFileId: action.payload });
        savePostsToLocalStorage(state.posts);
      }
    },

    // naya action jo explicit reload karega localStorage se
    loadFromLocalStorage: (state) => {
      state.posts = loadPostsFromLocalStorage();
    },
  },
});

export const {
  postSetter,
  postCreator,
  postDel,
  updatePost,
  getPost,
  getPosts,
  Filedel,
  uploadFile,
  getFilePreview,
  loadFromLocalStorage,
} = postSlice.actions;

export default postSlice.reducer;
