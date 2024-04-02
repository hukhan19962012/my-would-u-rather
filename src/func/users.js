import { USERS_RECIVE, USER_ANSWER_ADD, USER_QUESTION_ADD } from "../utils/constants"

export const receiveUsers = (users) => ({ type: USERS_RECIVE, users })

export const addUserAnswer = (userId, answer) => ({ type: USER_ANSWER_ADD, userId, answer })

export const addUserQuestion = (userId, questionId) => ({ type: USER_QUESTION_ADD, userId, questionId }) 
