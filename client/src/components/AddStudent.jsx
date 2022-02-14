import styles from "../styles/results2.module.css"
import Navbar from "./Navbar";
import {useState} from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function AddStudent() {
const navigate = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL

  const [user, setUser] = useState({
    name: '',
    phone: '',
    password: '',
    role:''
  })

  const handleChange = (type, e) => {
    let userTemp = { ...user }
    userTemp[type] = e;
    setUser(userTemp)
  }

  const submit = async() => {
    const { name, phone, password, role } = user
    const postData = {name,password,role,phone:parseInt(phone)}
    const response = await axios.post(`${BASE_URL}/api/auth/register`, postData)
    const status = await response.status
    console.log(status);

    if (status == 200) {
      navigate('/')
    }
    else {
      alert('failed to create user')
    }

  }

    return (
      <div style={{overflow:'hidden'}}>
        <Navbar/>
        <div className={`${styles.container}`}>
          <form className={`${styles.forms}`}>
               <h1>Add student</h1>
               Name <br></br> <input onChange={(e)=>handleChange('name',e.target.value)} type={"text"} name="name" className={`${styles.search}`}></input> <br></br>
               Phone number<br></br> <input onChange={(e)=>handleChange('phone',e.target.value)} type={"number"} name="phone number" maxLength={"9"} minLength={"9"} className={`${styles.search}`}></input> <br></br>
            Password <br></br><input type={"password"} onChange={(e)=>handleChange('password',e.target.value)} name="password" maxLength={"5"} className={`${styles.search}`}></input> <br></br><br></br>
            <div>
              <input onChange={(e)=>handleChange('role',e.target.value)} type="radio" name="role" value={'monitor'} />
              <span style={{marginLeft:'1rem'}}>Monitor</span>
            </div>

            <div>
              <input onChange={(e)=>handleChange('role',e.target.value)} type="radio" name="role" value={'student'} />
              <span style={{marginLeft:'1rem'}}>Student</span>
            </div>

            <button type="button" onClick={submit}>Create User</button>
               
          </form>
      </div>
      </div>
    );
  }

  export default AddStudent