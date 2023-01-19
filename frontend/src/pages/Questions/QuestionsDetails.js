import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import upVote from '../../assets/upvote.svg';
import downVote from '../../assets/downvote.svg';
import './Questions.css';
import { Link,  useLocation } from 'react-router-dom';
import {BiUpvote,BiDownvote} from 'react-icons/bi'

import DisplayAnswer from './DisplayAnswer';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postAnswer } from '../../redux/actions/studentAction';
import moment from 'moment';
import copy from 'copy-to-clipboard'
import { deleteQuestion, voteQuestion,  } from '../../redux/actions/studentAction';
import { fetchAllQuestions } from '../../redux/actions/studentAction';

const QuestionsDetails = () => {

   

    const {id} = useParams()
    const questionsList = useSelector(state => state.questionsReducer);
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const { user, isLogged, loading } = auth;
    const navigate=useHistory();

    useEffect(()=>{
        
        dispatch(fetchAllQuestions())
        // questionsList.sort((a, b) => {
        //     const parsedA = parseInt(a.upVote.length);
        //     const parsedB = parseInt(b.upVote.length);
        //     console.log('^^^',parsedA);
        //     console.log('^^^',parsedB);
        //     return parsedA > parsedB ? -1 : 1; // for descending sort inverse -1 and 1
        // })
        
      },[])

const [Answer, setAnswer] = useState('')
// const Navigate = useNavigate()
const dispatch = useDispatch()
const location = useLocation() 
const url = 'http://localhost:3000'

const handlePostAns = (e, answerLength) => {
    console.log(user);
    // e.preventDefault()
        if(Answer === ''){
            alert('Enter an Answer before submitting')
        }
        else{
            dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: user.name, userId: user._id}));
        
          
            
            
        
        }
    
}


const handleShare = () => {
    copy(url + location.pathname)
    alert('Copied url :'+url+location.pathname)
}

const handleDelete = () => {
    dispatch(deleteQuestion(id,token));
    navigate.push('/student');
}

const handleUpVote = () => {
    dispatch(voteQuestion(id, 'upVote', user._id,token))

}

const handleDownVote = () => {
    dispatch(voteQuestion(id, 'downVote', user._id,token))

}
  return (
    <div className='question-details-page'>
        {
            questionsList.data === null ? 
            <h1>Loading...</h1>:
            <>
                {
                    questionsList.data.filter(question => question._id === id).map(question => (
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <div className='questionuppart'>
                                <h1>{question.questionTitle}</h1>
                                <div className='userdetails'>
                                    <h6> User :  {question.userPosted}</h6>
                                    <h6> Asked : {moment(question.askedOn).fromNow()}</h6>
                                </div>
                                </div>
                                <div className='question-details-container-2'>
                                    <div className="question-votes">
                                        <BiUpvote  style={{ color: 'black' }} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <BiDownvote  style={{ color: 'black' }} width='18' className='votes-icon' onClick={handleDownVote}/>
                                    </div>
                                    <div className='questionbody'>
                                    <p className='question-body'>{question.questionBody}</p>
                                    </div>
                                </div>
                                <div className='tagsdelete' >
                                    
                                    <div className="question-details-tags">
                                        {
                                            question.questionTags.map((tag) => (
                                                <p key={tag}>{tag}</p>
                                            ))
                                        }
                                    </div>
                                    <div className='question-actions-user'>
                                        <div>
                                            <button type='button' onClick={handleShare}>Share</button>
                                            {
                                                user?._id === question?.userId && (
                                                    <button type='button' onClick={handleDelete}>Delete</button>
                                                )
                                            }
                                        </div>
                                       
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers !== 0 && (
                                    <>
                                    <h3>{question.noOfAnswers} answers</h3>
                                    <section className='DisplayAnswer'>
                                            
                                            <DisplayAnswer key={question.id} question={question} handleShare={handleShare}/>
                                    </section>
                                    </>
                                )
                            }
                            <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={(e) => {handlePostAns(e, question.answer.length)}}>
                                    <textarea name="" id="giveanswer" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br/>
                                    <input type="submit" className='post-ans-btn' value='Post Your Answer' />
                                </form>
                                <p>
                                    Browse other Question tagged
                                    {
                                        question.questionTags.map((tag) => (
                                            <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                        ))
                                    } or 
                                    <Link to='/AskQuestion' style={{textDecoration: "none", color: "#009dff"}}> ask your own Question.</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        }    
    </div>
  )
}

export default QuestionsDetails