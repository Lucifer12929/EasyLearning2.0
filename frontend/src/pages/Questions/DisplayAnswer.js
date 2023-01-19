import React from 'react'
import QuestionsDetails from './QuestionsDetails'
import { Link, useParams } from 'react-router-dom'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {deleteAnswer} from '../../redux/actions/studentAction'

const DisplayAnswer = ({question, handleShare}) => {
    const auth = useSelector((state) => state.auth);
    const { user} = auth;
    
  const {id} = useParams();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch()
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1,token))
  }

  return (
    <div className='answerssection'>
        {
            question.answer.map((ans) => (
                <div className='display-ans' key={ans.id}>
                    <p>{ans.answerBody}</p>
                    <div className='qbuttuser'>
                    <div className="question-actions-user">
                        <button type='button' onClick={handleShare}>Share</button>
                        
                                <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                            
                    </div>
                    <div>
                        
                       
                            
                            <div>
                              User : {ans.userAnswered}
                            </div>
                        
                        <p>answered {moment(ans.answeredOn).fromNow()}</p>
                    </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswer