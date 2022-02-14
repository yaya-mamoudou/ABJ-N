import styles from "../styles/results3.module.css"
import {useNavigate,useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

function Questions() {
  const navigate = useNavigate()
  const location = useLocation()
  const [questions, setQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [courseId, setCourseId] = useState(null)

  useEffect(() => {
    setQuestion(location.state.course)
    setCourseId(location.state._id)
  }, [])
  
  const handleChange = (value, key) => {
    let data = { ...answers }
    data[key] = value
    setAnswers(data)
  }

  const submit = async () => {
    let mark = 0;
    let user = await JSON.parse(localStorage.getItem('user'));
    const questionArray = await location.state.course.questions

    await Object.keys(answers).map(key => {

      if (answers[key] == questionArray[key].answer) {
        ++mark
      }
    })

    const data = {id:courseId, score: `${mark}/${questionArray.length}`, course: questions.name }

    const response = await axios.put(`${BASE_URL}/api/courses/submit-test`, { data, userId: user._id })

    if (response.status === 200) {
      await localStorage.setItem('user', JSON.stringify(response.data[0]))
      console.log(response.data);
      navigate('/') 
    }
  }
  
 return (
    questions !== null && 
    <div className={`${styles.question}`}>
      <Navbar/>
        <div style={{padding:'1rem 1rem'}}>
          <h1>{questions.name}   -  Question</h1> <br/>
          <form className={`${styles.answer}`} style={{ padding:'1rem'}}>
           {questions.questions.map((question, index) => {
              // console.log(question);
                return <div key={index} style={{marginBottom:15}}>
                  <p>{`${index + 1} - ${question.question}`}</p>
                  {question.options.map((option,optionIndex) => {
                    return <div key={optionIndex}>
                      <input onChange={(e)=>handleChange(e.target.value,index)} type={"radio"} name={`${index}`} value={option} /> <span>{option}</span> <br/>
                    </div>
                  })}
                </div>
            })}
            <button onClick={submit} type="button">Submit</button>
          </form>
        </div>
      </div>
    );
  }

export default Questions