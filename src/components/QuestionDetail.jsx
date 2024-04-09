import { useDispatch, useSelector } from "react-redux"
import {  useLocation, useNavigate } from "react-router-dom"
import { questionsPrefix } from "../utils/constants"
import _ from 'lodash'
import { useEffect } from "react"
import { handleVoteAnswer } from "../func/shared"

export const QuestionDetail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const qId = location.pathname.substring(questionsPrefix.length)
    const { authUser, users, questions } = useSelector(state => state)
    const q = Object.values(questions).find(x => x.id === qId)
    const optionOneVotes = q.optionOne.votes.length
    const optionTwoVotes = q.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = optionOneVotes / totalVotes * 100
    const optionTwoPercentage = optionTwoVotes / totalVotes * 100
    const author = q.author
    const usersNumber = Object.keys(users).length
    console.log(q)
    const showAvatar = (author) => {
        let user = _.pick(users, author)[author]
        return user.avatarURL
    }
    const isAnswered = Object.values(q.optionOne.votes).includes(authUser?.id) || Object.values(q.optionTwo.votes).includes(authUser?.id)
    useEffect(() => {
        if (authUser === null) {
            navigate('/login')
        }
    }, [authUser, navigate])

    const handleVote = (e, option) => {
        e.preventDefault() 
        dispatch(handleVoteAnswer(qId, option))
      }

    return <>
        <h1 className='text-center'>Poll By {author} </h1>
        <div className="d-flex justify-content-center mb-5">
            <img src={showAvatar(author)} alt={author} width="200" height="200" className='rounded mr-2' />
        </div>
        <h1 className='text-center mb-5' >Would You Rather</h1>
        <div class="container d-flex justify-content-between">
            {!isAnswered ? (<>
                <div class="card" style={{ width: 'auto' }}>
                    <div class="card-body">
                        <div className="card-info mb-3">
                            <h5 class="card-title">{q.optionOne.text}</h5>
                        </div>
                        <button onClick={(e) => handleVote(e, "optionOne")} type="button" className='link-show btn btn-success' key={q?.id}>vote</button>
                    </div>
                </div>
                <div class="card" style={{ width: 'auto' }}>
                    <div class="card-body">
                        <div className="card-info mb-3">
                            <h5 class="card-title">{q.optionTwo.text}</h5>
                        </div>
                        <button type="button" onClick={(e) => handleVote(e, "optionTwo")} className='link-show btn btn-danger' key={q?.id}>vote</button>
                    </div>
                </div>
            </>) : <><div class="card" style={{ width: 'auto' }}>
                <div class="card-body">
                    <div className="card-info mb-3">
                        <h5 class="card-title">{q.optionOne.text}{` (${Math.round(optionOnePercentage)}%)`}</h5>
                    </div>
                    <div className="bg-success text-light">{`${q.optionOne.votes.length}/${usersNumber} voted ${q.optionOne.votes.includes(authUser.id) ? '(includes your vote)' : ''}`}</div>
                </div>
            </div>
                <div class="card" style={{ width: 'auto' }}>
                    <div class="card-body">
                        <div className="card-info mb-3">
                            <h5 class="card-title">{q.optionTwo.text}{` (${Math.round(optionTwoPercentage)}%)`}</h5>
                        </div>
                        <div className="bg-danger text-light">{`${q.optionTwo.votes.length}/${usersNumber} voted ${q.optionTwo.votes.includes(authUser.id) ? '(includes your vote)' : ''}`}</div>
                    </div>
                </div></>}

        </div>
    </>
}