import React, { Fragment, useEffect, useMemo, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { handleData } from '../func/shared';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Navigate,
  Routes,

} from "react-router-dom";
import { Login } from './Login';
import { Logout } from './Logout';
import { NavBar } from './NavBar';
import { Home } from './Home';
import { NewQuest } from './NewQuest';

const questionsPrefix = '/questions/'

export const App = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(handleData())
  }, [dispatch])


  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/add' element={<NewQuest />} />
        {/* <Route component={ErrorPage} /> */}
      </Routes>
    </>
  )
}


