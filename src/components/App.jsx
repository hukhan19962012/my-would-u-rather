import React, { useEffect, useMemo, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { handleData } from '../func/shared';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import AuthedRouter from './AuthedRouter';
import { Logout } from './Logout';

const questionsPrefix = '/questions/'

export const App = () => {
  const [loading, isLoading] = useState(false)
  const [loggedIn, isLoggedIn] = useState(false)
  const { authUser, questions, questionId, users } = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(handleData())
  }, [])

  useEffect(() => {
    if (authUser !== null) {
      isLoggedIn(true)
    }

  }, [users, questions, authUser])

  return (
    <>
      {loading 
        ? null
        : (
          <>
            <Routes>
              <Route exact path='/login' Component={Login} />
              <AuthedRouter exact path='/logout' Component={Logout} isLoggedIn={loggedIn} />
              {/* <Route component={ErrorPage} /> */}
            </Routes>
          </>
        )
      }
    </>)
}



