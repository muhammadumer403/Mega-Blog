import React from "react";
import { useDispatch } from "react-redux";
import AuthService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Logoutbtn() {
  const dispatch = useDispatch();

  const logouthandler = () => {
    AuthService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logouthandler}
      className="inline-block px-6 py-2 bg-red-600 text-white duration-200 rounded-full hover:bg-red-700 focus:outline-none dark:bg-red-700 dark:hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default Logoutbtn;
