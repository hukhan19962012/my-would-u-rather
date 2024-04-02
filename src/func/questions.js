import { QUESTIONS_RECIVE, QUESTION_ADD, VOTES_UPDATE } from "../utils/constants"

export const addQuestion = (question) => ({ type: QUESTION_ADD, question })

export const receiveQuestions = (questions) => ({ type: QUESTIONS_RECIVE, questions })

export const updateVotes = (questionId, option, userId) => ({ type: VOTES_UPDATE, questionId, option, userId })
   
