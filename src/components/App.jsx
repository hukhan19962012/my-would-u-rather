import React, { useEffect, useMemo, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { handleData } from '../func/shared';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login';

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
    // if ((Object.keys(users).length === 0 && users.constructor === Object) || (Object.keys(questions).length === 0 && questions.constructor === Object)) {
    //   isLoading(true)
    // }

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
              {/* <Route component={ErrorPage} /> */}
            </Routes>
          </>
        )
      }
    </>)
}



