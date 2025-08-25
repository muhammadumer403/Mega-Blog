import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
           
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;


//function red(action.payload){console.log(action.payload)}

//red(userData)
//userData = action.payload

/*
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.payload? {...todo, completed:!todo.completed } : todo
        );
    case 'DELETE_TODO':
        return state.filter(todo => todo.id!== action.payload);
    case 'EDIT_TODO':
        return state.map(todo =>
          todo.id === action.payload.id? {...todo, title: action.payload.title } : todo
        );
    default:
      return state;
  }
};

arr.map((item,index))
action.payload = {
u{}}

const initialState = {
    status : false,
    userData: {
    name:"ali",
    age:35}
}
}
*/