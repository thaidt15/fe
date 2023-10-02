// routes.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Homes from '../page/common/Home.jsx'; 

import HODDashBoard from '../page/HOD/Dashboard.jsx'
import HODBRoleList from '../page/HOD/RoleList.jsx'; 
import HODBClassUser from '../page/HOD/ClassUser.jsx'
import HODBProject_Backlog from '../page/HOD/Project_backlog.jsx'
import HODIteration from '../page/HOD/Iteration.jsx'; 
import HODISemester from '../page/HOD/Semester.jsx'; 
import HODClassList from '../page/HOD/ClassList.jsx'
import HODClassDetails from '../page/HOD/ClassDetails.jsx'
import HODUserList from '../page/HOD/UserList.jsx'
import HODUserDetails from '../page/HOD/UserDetails.jsx'

import TeacherDashBoard from '../page/Teacher/Dashboard.jsx'
import TeacherCheckList from '../page/Teacher/Checklist.jsx'; 
import TeacherClassUser from '../page/Teacher/ClassUser.jsx'
import TeacherProject_Backlog from '../page/Teacher/Project_backlog.jsx'
import TeacherClass from '../page/Teacher/ClassList.jsx'

import TeacherTeamDetails from'../page/Teacher/TeamDetails.jsx'

import StudentClassUser from '../page/Student/ClassUser.jsx'
import StudentProject_Backlog from '../page/Student/Project_backlog.jsx'

import ReviewerProject_Backlog from '../page/Reviewer/Project_backlog.jsx'
const MyRoutes = () => { // Rename the component here
  return (
    <Routes>
      {/* hodb */}
      <Route path="/hod/" exact element={<HODDashBoard />} /> 
      <Route path="/hod/role-list" exact element={<HODBRoleList />} /> 
      <Route path="/hod/class-list" exact element={<HODClassList/>}/>
      <Route path='hod/class-details' exact element={<HODClassDetails/>}/>
      <Route path='hod/user-list' exact element={<HODUserList/>}/>
      <Route path='hod/user-details' exact element={<HODUserDetails/>}/>

      <Route path="/hod/class-user" exact element={<HODBClassUser />} /> 
      <Route path="/hod/semester" exact element={<HODISemester />} /> 
      <Route path="/hod/iteration" exact element={<HODIteration />} /> 
      <Route path="/hod/project-backlog" exact element={<HODBProject_Backlog />} /> 

      {/* teacher */}
      <Route path="/teacher/" exact element={<TeacherDashBoard />} /> 
      <Route path="/teacher/checklist-list" exact element={<TeacherCheckList />} /> 
      <Route path="/teacher/class-user" exact element={<TeacherClassUser />} /> 
      <Route path="/teacher/project-backlog" exact element={<TeacherProject_Backlog />} /> 
      <Route path="/teacher/class" exact element={<TeacherClass />} /> 

      <Route path="/teacher/team-details" exact element={<TeacherTeamDetails />} /> 
      {/* student */}
      <Route path="/student/class-user" exact element={<StudentClassUser />} /> 
      <Route path="/student/project-backlog" exact element={<StudentProject_Backlog />} /> 

      {/* reviewer */}
      <Route path="/reviewer/project-backlog" exact element={<ReviewerProject_Backlog />} /> 
      <Route path="/" exact element={<Homes />} /> 
      {/* <Route path="/login" exact element={<Login />} />  */}
{/* 
      <Route path="/role-list" exact element={<RoleList />} /> 
      <Route path="/checklist-list" exact element={<CheckList />} /> 
      <Route path="/milestone" exact element={<Milestone />} /> 
      <Route path="/class-user" exact element={<ClassUser />} /> 
      <Route path="/project-backlog" exact element={<Project_Backlog />} />  */}
    </Routes>
  );
};

export default MyRoutes; // Export the renamed component
