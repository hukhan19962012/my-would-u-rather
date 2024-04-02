import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )
    } />
)

export default ProtectedRoute
