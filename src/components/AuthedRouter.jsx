import React from 'react'
import { Navigate, Redirect, Route } from 'react-router-dom'

const AuthedRouter = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={
        (props) => (
        isLogin
            ? <Component {...props} />
            : <Navigate to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )
    } />
)

export default AuthedRouter
