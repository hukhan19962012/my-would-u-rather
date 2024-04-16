import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import _ from 'lodash'

export const Home = () => {

    const { authUser, users, questions } = useSelector(state => state)
    const navigate = useNavigate()


    useEffect(() => {
        if (authUser === null) {
            navigate('/login?returnUrl=home')
        }
    }, [authUser, navigate])

    const showAvatar = (author) => {
        let user = _.pick(users, author)[author]
        return user.avatarURL
        
    }

    return (
        <>
            <h1 className="text-center">Questions</h1>
            <div className="questions mb-5 mt-5 mx-auto">
                {Object.values(questions).filter(q => !(Object.values(q.optionOne.votes).includes(authUser?.id) || Object.values(q.optionTwo.votes).includes(authUser?.id))).sort((a,b,) => b.timestamp - a.timestamp).map(q => (
                <div class="card" style={{ width: '18rem' }}>
                    <img class="card-img-top" src={showAvatar(q.author)} alt="author" />
                    <div class="card-body">
                        <div className="card-info mb-3">
                        <h5 class="card-title">{q.author}</h5>
                        <p class="card-text">{new Date(q.timestamp).toLocaleDateString()}</p>
                        </div>
                        <Link to={`/questions/${q?.id}`} className='link-show btn btn-success' key={q?.id}>show</Link>
                    </div>
                </div>
                ))}

            </div>
            <h1 className="text-center">Done</h1>
            <div className="questions mb-5 mt-5 mx-auto">
                {Object.values(questions).filter(q => Object.values(q.optionOne.votes).includes(authUser?.id) || Object.values(q.optionTwo.votes).includes(authUser?.id)).sort((a,b,) => b.timestamp - a.timestamp).map(q => (
                <div class="card" style={{ width: '18rem' }}>
                    <img class="card-img-top" src={showAvatar(q.author)} alt="author" />
                    <div class="card-body">
                        <div className="card-info mb-3">
                        <h5 class="card-title">{q.author}</h5>
                        <p class="card-text">{new Date(q.timestamp).toLocaleDateString()}</p>
                        </div>
                        <Link to={`/questions/${q?.id}`} className='link-show btn btn-success' key={q?.id}>show</Link>
                    </div>
                </div>
                ))}

            </div>

        </>
    )
}