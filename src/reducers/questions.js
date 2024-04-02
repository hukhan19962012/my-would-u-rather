import { QUESTIONS_RECIVE, QUESTION_ADD, VOTES_UPDATE } from "../utils/constants"

export const questions = (state = {}, action) => {
    switch (action.type) {
        case QUESTIONS_RECIVE:
            return { ...state, ...action.question }
        case QUESTION_ADD:
            return { ...state, [action.question.id]: action.question }
        case VOTES_UPDATE:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    optionOne: action.option === 'optionOne' ? { ...state[action.questionId].optionOne, votes: state[action.questionId].optionOne.votes.concat([action.userId]) }
                        : state[action.questionId].optionOne,
                    optionTwo: action.option === 'optionTwo'
                        ? { ...state[action.questionId].optionTwo, votes: state[action.questionId].optionTwo.votes.concat([action.userId]) }
                        : state[action.questionId].optionTwo
                }
            }
        default:
            return state
    }
}
