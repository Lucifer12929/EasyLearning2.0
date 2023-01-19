import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Student.css'

const Questions = ({question}) => {
  
  return (
    <div className='display-question-container'>
      <div class="course">
		<div class="course-preview">
			<h6>User</h6>
			<h2>{question.userPosted}</h2>
      <p>asked {moment(question.askedOn).fromNow()}</p>
      <div className='leftflex'>
        <div className='display-votes-ans'>
            <p>{question.upVote.length - question.downVote.length}</p>
            <p>votes</p>
        </div>
        <div className='display-votes-ans'>
            <p>{question.noOfAnswers}</p>
            <p>answers</p>
        </div>
        </div>
        </div>
        <div className='display-question-details'>
        <h4>Question</h4>
            {/* <Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link> */}
            <h1>{question.questionTitle}</h1>
            <div className='display-tags-time'>
                <div className='display-tags'>
                  {
                    question.questionTags.map((tag) => (
                      <p key={tag}>{tag}</p>
                    ))
                  }
                </div>
              
            </div>
            <button className='gotoquestion'>
               <Link to={`/Questions/${question._id}`} className='question-title-link'>Watch</Link>
               </button>
        </div>
    </div>
    </div>
  )
}

export default Questions