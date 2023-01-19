import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

const API = axios.create({baseURL: 'http://localhost:4000'})




export const postQuestion = (questionData,token) => API.post('/student/Ask', questionData,
{
    headers: {
      Authorization: token,
    },
  })
export const getAllQuestions = () => API.get('/student/get');
export const deleteQuestion = (id,token) => API.delete(`/student/delete/${id}`,{
  headers: {
    Authorization: token,
  },
})
export const voteQuestion = (id, value, userId,token) => API.patch(`/student/vote/${id}`, {value, userId},{
  headers: {
    Authorization: token,
  },
})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`,{noOfAnswers, answerBody, userAnswered, userId},);
export const deleteAnswer = (id, answerId, noOfAnswers,token) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers},{
  headers: {
    Authorization: token,
  },
})

