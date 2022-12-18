import { Card, Rate } from 'antd'
import React from 'react'
import  {Link} from 'react-router-dom' 
const CourseCard = ({ course }) => {
    
    return (
        <div className ='coursecard'>
            <div className='content'>
               <div className='imgBx'>
                <img alt="example" src={course.image} />
                </div>
                <div className='contentBx'>
                <Link to = {`/courses/${course._id}`}>
                <h3>
                    
                    {course.name}
                    
                </h3>
                <div className='name_p'>
                <h4>${course.price}</h4>
              
                <Rate disabled  width = '2' allowHalf value={course.rating} />
                
                </div>
                <button className='button'>Visit Now</button>
               
                </Link>
                </div>
           </div>
            {/* <div className='class'>
                <div className='imgBx'>
                    <img src={course.image}/>
                </div>
                <div className='content'>
                <h3>
                    <Link to = {`/courses/${course._id}`}>
                    {course.name}
                    </Link>
                </h3>
                <h4>{course.user.name}</h4>
                <h5>${course.price}</h5>
                <div className = 'rating'>
                <Rate disabled  width = '2' allowHalf value={course.rating} />
                </div>
                </div>
            </div> */}
        </div>

    )
}

export default CourseCard