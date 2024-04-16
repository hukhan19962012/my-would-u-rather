import { getData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, addUserQuestion, addUserAnswer } from './users'
import { receiveQuestions, addQuestion, updateVotes } from './questions'



export const handleData = () => {
  return (dispatch) => {
    return getData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
    })
  }
}

export const handleNewQuestion = (optionOne, optionTwo) => {
  return (dispatch, getState) => {

    let { authUser } = getState()
    let questionId = ''

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authUser.id
    })
      .then((result) => {
        dispatch(addQuestion(result))
        questionId = result.id
        return questionId
      })
      .then(() => dispatch(addUserQuestion(authUser.id, questionId)))
      .then(() => {
        return questionId
      })
  }
}


export const handleVoteAnswer = (questionId, option) => {
  return (dispatch, getState) => {

    let { authUser } = getState()
    let answer = { [questionId]: option }


    return saveQuestionAnswer({
      authedUser: authUser.id,
      qid: questionId,
      answer: option,
    })
      .then(() => dispatch(updateVotes(questionId, option, authUser.id)))
      .then(() => dispatch(addUserAnswer(authUser.id, answer)))

  }
}