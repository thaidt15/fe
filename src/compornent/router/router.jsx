// routes.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Homes from '../page/Home.jsx'; 
import Login from '../page/LoginPage.jsx'; 
import Class from '../page/ClassPage.jsx'; 
const MyRoutes = () => { // Rename the component here
  return (
    <Routes>
      <Route path="/" exact element={<Homes />} /> 
      <Route path="/login" exact element={<Login />} /> 
      <Route path="/class" exact element={<Class />} /> 
    </Routes>
  );
};

export default MyRoutes; // Export the renamed component
