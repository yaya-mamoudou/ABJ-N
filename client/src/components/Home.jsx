import styles from "../styles/results4.module.css"
import {Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from './Navbar'

const BASE_URL = process.env.REACT_APP_BASE_URL

function Results4() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  
  const handleCourse = async () => {
    let courseToDisplay = []
    let userId = JSON.parse(localStorage.getItem('user'))._id
    console.log(userId);
    const allCourses = await axios.get(`${BASE_URL}/api/courses/all/${userId}`)
    // const userTakenCourses = await JSON.parse(localStorage.getItem('user')).taken
    // courseToDisplay = [...userTakenCourses]

    // allCourses.data.map(({course}) => {
    //   courseToDisplay = [...courseToDisplay, course]
    // })

    // console.log(allCourses);
    setCourses(allCourses.data)
  }

  useEffect(() => {
    handleCourse()
  }, []);



    return (
      <div>
        <Navbar/>
        <div className={`${styles.form}`}>
          {courses.length > 0 && courses.map((course, index) => {
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
      </div>
      </div>
    );
  }

export default Results4