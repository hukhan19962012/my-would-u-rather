import { loginAuthUser } from '../func/authUser'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';


export const Login = () => {
    const [searchParam] = useSearchParams()
    const [loading, isLoading] = useState(false)
    const [state, setState] = useState({ selectedUser: '', shouldRedirect: false })
    const handleChange = (id) => {
        setState((preState) => ({ selectedUser: id }))
    }
    const { users } = useSelector(state => state)
    const dispatch = useDispatch()


    useEffect(() => {

        if(users === null){
            isLoading(true)
        }
        
      },[users])

    const login = (e) => {
        e.preventDefault()

        let uId = state.selectedUser
        let user = Object.values(users).find(x => x.id === uId)
        let name = user.name
        let picture = user.avatarURL
        dispatch(loginAuthUser(uId, name, picture))
        setState((prevState) => ({
            ...prevState,
            shouldRedirect: true
        }))
    }

    let  from  = searchParam.get('returnUrl')
    if (from === 'login' || from === 'logout' || from === 'home') {
        from = ''
    }

    if (state.shouldRedirect === true) {
        return <Navigate to={`/${from}`} />
    }

    return (
    <>
        <h3 className='text-center'>Please login:</h3>
        {loading ? null :
            <>
                <div className='row justify-content-center'>
                    {Object.values(users).map(u => (
                        <div key={u.id} className={'card m-2 loginCard ' + (u.id === state.selectedUser ? 'border-success' : '')} style={{ width: 14 + 'rem', cursor: 'pointer' }} onClick={() => handleChange(u.id)}>
                          
                            <img className="card-img-top" src={u.avatarURL} alt="Avatar" />
                            <div className="card-body">
                                <p className="card-text text-center">{u.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='row'>
                    <button className="btn btn-lg btn-outline-success mx-auto" type="button" onClick={login} disabled={!state.selectedUser.length > 0}>Login</button>
                </div>
            </>}
    </>
    )

}
