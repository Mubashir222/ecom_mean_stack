import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmResetPassword from './pages/ResetPassword';
import Navbar from './components/_App/Navbar';
import {Toaster} from "react-hot-toast";
import './App.css';
import { useDispatch } from 'react-redux';
import { addUser } from './store/reducer';
import ProtectedRoute from './utils/Private/ProtectedRoutes';
import Dashboard from './pages/Admin/Dashboard';
import NotFound from './pages/NotFound';
import Footer from './components/_App/Footer';
import Settings from './pages/Settings';
import Loading from './utils/Loading';
import Blog from './pages/Blogs/Blogs';
import AdminProtectedRoutes from "./utils/Private/AdminProtectedRoutes";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();

  const fetchUser = () => {
    const user = localStorage.getItem('agile_user');
    if (user) {
      setUser(JSON.parse(user));
      dispatch(addUser(JSON.parse(user)));
    }
  };

  useEffect(() => {
    fetchUser();
    const timeout = setTimeout(setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" exact element={<HomePage user={user}/>} />
        <Route path="/signup" exact element={<Signup/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/forgot-password" exact element={<ForgotPassword/>} />
        <Route path="/reset-password/:email" exact element={<ConfirmResetPassword user={user}/>} />
        <Route
          path="/dashboard"
          element={<AdminProtectedRoutes Element={Dashboard} />}
        />
        <Route path="/blogs" element={<Blog/>}/>
        <Route
          path="/settings"
          element={<ProtectedRoute Element={Settings} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
};
