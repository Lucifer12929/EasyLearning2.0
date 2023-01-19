import React, { useEffect } from 'react'
import Questions from './Questions';

const QuestionList = ({questionsList}) => {
  // function compare( a, b ) {
  //   if ( a.upVote.length < b.upVote.length ){
  //     return -1;
  //   }
  //   if ( a.upVote.length > b.upVote.length ){
  //     return 1;
  //   }
  //   return 0;
  // }
  
  // questionsList.sort( compare );
//  const List=[...questionsList.data].sort((a, b) => a.upVote.length> b.upVote.length );
//  console.log('....',List);

  return (
    <>
      {
          questionsList.map((question) => (
            <Questions question={question} key={question._id}/>
          ))
      }  
    </>
  )
}

export default QuestionList