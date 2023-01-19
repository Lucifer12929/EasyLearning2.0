import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import './AskQuestion.css';
import {askQuestion} from '../../redux/actions/studentAction'

const AskQuestion = () => {

  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')


  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
  const { user, isLogged, loading } = auth;
  const token = useSelector((state) => state.token);
  const navigate = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({questionTitle, questionBody, questionTags})
    dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: user.name, userId: user?._id},token));
    navigate.push('/student');
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      setQuestionBody(questionBody + "\n")
    }
  }

  return (
    <div>
      <div className="ask-question">
        <div className="ask-ques-container">
          <h1>Ask a Public Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="ask-form-container">
              <div className='upperpart'>
              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>Be Specific and imagine you're asking a Question to another person</p>
                <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
              </label>
              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add up to 5 tags to describe what your question is about</p>
                <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. (string python-3.x angularjs)'/>
              </label>
              </div>
              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>Include all the information someone would need to answer your Question</p>
                <textarea name="" id="ask-ques-body" onChange={(e) => {setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
              </label>
             
            </div>
            <input type="submit" value='Review your Question' className='review-btn'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion