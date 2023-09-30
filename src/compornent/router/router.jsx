// routes.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Homes from '../page/Home.jsx'; 
import Login from '../page/LoginPage.jsx'; 
import Class from '../page/ClassPage.jsx'; 
import RoleList from '../page/RoleList.jsx'; 
import CheckList from '../page/Checklist.jsx'; 
import Milestone from '../page/Milestone.jsx'
import ClassUser from '../page/ClassUser.jsx'
import Project_Backlog from '../page/Project_backlog.jsx'
const MyRoutes = () => { // Rename the component here
  return (
    <Routes>
      <Route path="/" exact element={<Homes />} /> 
      <Route path="/login" exact element={<Login />} /> 
      <Route path="/class" exact element={<Class />} /> 
      <Route path="/role-list" exact element={<RoleList />} /> 
      <Route path="/checklist-list" exact element={<CheckList />} /> 
      <Route path="/milestone" exact element={<Milestone />} /> 
      <Route path="/class-user" exact element={<ClassUser />} /> 
      <Route path="/project-backlog" exact element={<Project_Backlog />} /> 
    </Routes>
  );
};

export default MyRoutes; // Export the renamed component
