import React, {  useEffect } from 'react';

import '../App.css';
import { handleData } from '../func/shared';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,

} from "react-router-dom";
import { Login } from './Login';
import { Logout } from './Logout';
import { NavBar } from './NavBar';
import { Home } from './Home';
import { NewQuest } from './NewQuest';
import { LeaderBoard } from './LeaderBoard';
import { QuestionDetail } from './QuestionDetail';
import { questionsPrefix } from '../utils/constants';
import { ErrorPage } from './ErrorPage';



export const App = () => {
  const location = useLocation()
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
        <Route exact path='/leaderboard' element={<LeaderBoard />} />
        <Route path={`${questionsPrefix}:id`} element={<QuestionDetail/>}/>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}


