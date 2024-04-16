import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { handleNewQuestion } from "../func/shared"

export const NewQuest = () => {
    const { authUser } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')


    useEffect(() => {
        if (authUser === null) {
            navigate('/login?returnUrl=add')
        }
    }, [authUser, navigate])

    const submitForm = () => {
        dispatch(handleNewQuestion(optionOne, optionTwo))
            .then((qid) => {
                if (qid !== '') {
                    navigate('/')
                }
            })

    }

    return (<div>
        <div>
            <h3 className='text-center mb-3'>Add a new question</h3>
            <h4 className='text-center mb-3'>Would You Rather...</h4>
            <form>
                <div className="container">
                    <div className="form-row mb-3">
                        <div className="form-group col ">
                            <label htmlFor="inputOne">First option</label>
                            <input type="text" className="form-control" id="inputOne" placeholder="First option" value={optionOne} onChange={(e) => setOptionOne(e.target.value)} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col text-center'>
                           <h3> or</h3>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputTwo">Second option</label>
                        <input type="text" className="form-control" id="inputTwo" placeholder="Second option" value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} />
                    </div>

                    <div className='row'>
                        <button type="button" className="btn btn-primary btn-lg mx-auto" disabled={optionOne === '' || optionTwo === ''} onClick={submitForm}>Add question</button>
                    </div>
                </div>
            </form>
        </div>
    </div>)
}