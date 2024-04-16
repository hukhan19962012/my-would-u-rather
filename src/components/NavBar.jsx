import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom"

export const NavBar = () => {
    const authUser = useSelector(state => state.authUser)
    const { pathname } = useLocation()
    const loggedIn = authUser !== null

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                Would You Rather...?
            </NavLink>
            <div className="navbar-collapse" id="nav">
                <div className="navbar-nav">
                    <NavLink
                        to="/"
                        activeclassname={pathname === '/' ? 'active' : ''}
                        className="nav-item nav-link">
                        Home
                    </NavLink>
                    <NavLink
                        to="/add" activeclassname={pathname === '/add' ? 'active' : ''}
                        className="nav-item nav-link">
                        Add Question
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        activeclassname={pathname === '/leaderboard' ? 'active' : ''}
                        className="nav-item nav-link">
                        Leaderboard
                    </NavLink>
                </div>
            </div>
            <div className="navbar-nav navbar-right">
                {
                    loggedIn
                        ? (
                            <div className="navbar-brand navbar-right d-flex align-items-center">
                                <span style={{ fontSize: 16 + 'px' }}>Hi, {authUser.name}!</span>
                                <img src={authUser.avatarPath}
                                    width="34"
                                    height="34"
                                    className="d-inline-block align-top rounded mr-2 ml-2"
                                    alt="" />
                                {
                                    pathname === '/logout' 
                                        ? null
                                        : <NavLink to='/logout'>
                                            <button className="btn btn-outline-success" type="button">Logout</button>
                                        </NavLink>
                                }
                            </div>
                        )
                        : (
                            <div>
                                {
                                    pathname === '/login' 
                                        ? null
                                        : <NavLink to='/login'>
                                            <button className="btn btn-outline-success" type="button">Login</button>
                                        </NavLink>
                                }
                            </div>
                        )
                }
            </div>
        </nav>
    )
}