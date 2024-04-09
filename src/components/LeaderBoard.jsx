import { useEffect } from "react"
import {  useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const LeaderBoard = () => {

    const { authUser, users } = useSelector(state => state)
    const navigate = useNavigate()

    useEffect(() => {
        if (authUser === null) {
            navigate('/login')
        }
    }, [authUser, navigate])

    const sortedUsers = Object.values(users).sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length))

    return <>

        <h3 className='text-center mb-3 mt-3'>Leader Board</h3>
        <div className="container">
            <table class="table table-light table-striped">
                <thead className="thead-light">
                    <tr>
                        <th scope="col" colSpan={3}>Name</th>
                        <th scope="col">Answered</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(x => (
                        <tr >
                            <td colSpan={3}>
                                <img src={x.avatarURL} alt={x.name} width="40" height="40" className='rounded mr-3' />
                                {x.name}
                            </td>
                            <td>{x.questions.length}</td>
                            <td>{Object.keys(x.answers).length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}