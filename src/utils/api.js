import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
  } from './_DATA.js'
  
  export const getData = () => Promise.all([_getQuestions(),_getUsers()]).then(([questions, users]) => ({questions,users}))

  export const saveQuestion = (question) => _saveQuestion(question)
  
  export const saveQuestionAnswer = (answer) => _saveQuestionAnswer(answer)
  