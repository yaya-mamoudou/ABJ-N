import styles from "../styles/results4.module.css"
import {Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from './Navbar'

const BASE_URL = process.env.REACT_APP_BASE_URL

function Results4() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [allTaken, setAllTaken] = useState([])
  const [userRole, setUserRole] = useState('')
  
  const handleCourse = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user.role)
    if (user.role == 'student') {
      let courseToDisplay = []
      let userId = user._id
      const allCourses = await axios.get(`${BASE_URL}/api/courses/all/${userId}`)
      setCourses(allCourses.data) 
    }
    else if (user.role == 'monitor') {
      const takenCourses = await (await axios.get(`${BASE_URL}/api/courses/all-taken`)).data
      console.log(takenCourses);
      setAllTaken(takenCourses)
    }
    
    
    // const userTakenCourses = await JSON.parse(localStorage.getItem('user')).taken
    // courseToDisplay = [...userTakenCourses]

    // allCourses.data.map(({course}) => {
    //   courseToDisplay = [...courseToDisplay, course]
    // })

    // console.log(allCourses);
  }

  useEffect(() => {
    handleCourse()
  }, []);



    return (
      <div>
        <Navbar/>
        <div className={`${styles.form}`}>
          {userRole == 'student' && courses.length > 0 && courses.map((course, index) => {
          // console.log(course,'moi');
          return (
            course.score ? (
              <form style={{borderColor:'green'}}  key={index} className={`${styles.box}`}>
              <div  className={`${styles.quest}`}><h1>{course.course}</h1> </div>
                <div className={`${styles.score}`}><h1>Score: { course.score}</h1></div>
            </form>
            ) :  (
              <Link key={index} to={`/questions/${index - 1}`} state={course}>
              <form className={`${styles.box}`}>
              <div className={`${styles.quest}`}><h1>{course.course.name}</h1> </div>
              <div className={`${styles.score}`}><h1>Score:  /3</h1></div>
            </form>
            </Link>
            )
        )
          })}
          
          <div style={{margin:'3rem auto'}}>
          {userRole == 'monitor' && allTaken.length > 0 && allTaken.map((user, index) => {
          // console.log(course,'moi');
            return (
              <div style={{marginBottom:'1.5rem'}}>
                <div style={{marginBottom:'.5rem',fontWeight:'bold'}} key={index}>{user.name}</div>
                <table style={{width:'50vw'}}>
                  <thead>
                    <th>Course</th>
                    <th>Score</th>
                  </thead>
                  {user.taken && user.taken.map((course, index) => {
                  return (
                    <tr>
                      <td>{course.course}</td>
                      <td>{ course.score}</td>
                    </tr>
                  )
                })}
                </table>
              </div>
            )
          })}
          </div>
      </div>
      </div>
    );
  }

export default Results4