import { useDispatch, useSelector } from "react-redux"
import { logoutAuthUser } from "../func/authUser"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Logout = () => {
    const authUser = useSelector(state => state.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (authUser === null) {
            navigate('/login')
        }
    },[authUser, navigate])

    const logout = () => {
        dispatch(logoutAuthUser())
    }

    return (
        <>
            <h2 className="text-center">{authUser?.name}, Do you want to logout? </h2>
            <div className='row'>
                <button className="btn btn-lg btn-outline-success mx-auto" type="button" onClick={logout}>Logout</button>
            </div>
        </>
    )
}