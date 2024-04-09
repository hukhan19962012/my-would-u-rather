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



export const App = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const { questions } = useSelector(state => state)
  const qId =location.pathname.substring(questionsPrefix.length)
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
        {
                    Object.keys(questions).includes(qId) &&
                      <Route path={`${questionsPrefix}:id`} element={<QuestionDetail/>}/>
                  }
        {/* <Route component={ErrorPage} /> */}
      </Routes>
    </>
  )
}


