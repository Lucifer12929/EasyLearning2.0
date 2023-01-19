import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useHistory} from 'react-router-dom'
import Questions from './Questions';
import './Student.css';
import QuestionList from './QuestionList';
import {useSelector} from 'react-redux';
import { useDispatch} from 'react-redux';
import {fetchAllQuestions} from '../../redux/actions/studentAction'

const HomeMainbar = () => {

  const location = useLocation()
  const user = 1;
  const navigate = useHistory()
  const dispatch = useDispatch()
  const questionsList = useSelector(state => state.questionsReducer)
  
 
 console.log('#####',questionsList);
  



  useEffect(()=>{
    dispatch(fetchAllQuestions());
   
  },[])


  const checkAuth = () => {
   
      navigate.push('/AskQuestion');
  }

  return (
    <div className='main-bar'> 
      <div className='main-bar-header'>
        {
          location.pathname === '/Student' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div className='centerquestion'>
        {
          questionsList.data === null ? 
          <h1>Loading...</h1> : 
          <>
            <p className='length'>{questionsList.data.length } questions</p>
            <QuestionList questionsList={questionsList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar