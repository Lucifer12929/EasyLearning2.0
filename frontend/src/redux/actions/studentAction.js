import React from 'react'
import * as api from '../../api/index'

export const askQuestion = (questionData,token) => async (dispatch) => {
    try{
        console.log('****',questionData);
        const {data} = await api.postQuestion(questionData,token)
        console.log('&&&',data);
        dispatch({ type: "POST_QUESTION", payload: data})
        dispatch(fetchAllQuestions())
        
    }
    catch(error){
        console.log(error)
    }

}

export const fetchAllQuestions = () => async (dispatch) => {
    try{
        console.log('Hi$$$')
        const {data} = await api.getAllQuestions();
        const hi= [...data].sort(function (a, b) {
            var x=a.upVote.length - a.downVote.length;
            var y=b.upVote.length - b.downVote.length
            return x-y;
          });
          hi.reverse();
    //    const hi= [...data].sort((a, b) => (a.upVote.length - a.downVote.length) > (b.upVote.length - b.downVote.length));
        console.log('@@',hi);
        dispatch({type:'FETCH_ALL_QUESTIONS', payload: hi})
    }
    catch(error){
        console.log(error)
    }
}

export const deleteQuestion = (id, token) => async(dispatch) => {
    try{
        const {data} = api.deleteQuestion(id,token)
        dispatch(fetchAllQuestions())
       
    }   
    catch (error){
        console.log(error)
    }
}

export const voteQuestion = (id, value, userId,token) => async(dispatch) => {
    try{
        const { data } = await api.voteQuestion(id, value, userId,token)
        dispatch(fetchAllQuestions())
    }
    catch(error){
        console.log(error)
    }
}

export const postAnswer = (answerData) => async (dispatch) => {
    try{
        console.log(answerData);
        const {id, noOfAnswers, answerBody, userAnswered, userId} = answerData 
        const {data} = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId)
        console.log('????',data);
        dispatch({type: 'POST_ANSWER', payload: data})
        dispatch(fetchAllQuestions())
 
    }catch (error){ 
        console.log(error)
    }
    
    
}

export const deleteAnswer = (id, answerId, noOfAnswers,token) => async(dispatch) => {
    try{
        const {data} = await api.deleteAnswer(id, answerId, noOfAnswers,token)
        dispatch(fetchAllQuestions())
    }   
    catch(error){
        console.log(error)
    }
}