import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice/";
import { Footer, Header } from "./components/Index";
import { Outlet } from "react-router-dom";
import Loading from "./components/pages/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

return !loading ? (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
}

export default App;
