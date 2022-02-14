import styles from "../styles/login.module.css"
import {useNavigate } from "react-router-dom";
import { login } from '../api/index'
import { useState } from 'react'
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const login = async() => {
    try {
      let response = await axios.post(`${BASE_URL}/api/auth/login`,{phone,password})
      if (response.status === 500) {
        throw response
      }
      else if (response.status === 200) {
        localStorage.setItem('user',JSON.stringify(response.data))
            navigate('/')
      }
    } catch (error) {
      console.log(error.message);  
    }
  }
    return (
      <div className={`${styles.container}`}>
          <form className={`${styles.forms}`}>
               <h1>Sign in</h1>
               Phone number<br></br> <input value={phone} onChange={(e)=>setPhone(e.target.value)} type={"number"} name="phone number" maxLength={"9"} minLength={"9"} className={`${styles.search}`}></input> <br></br>
               Password <br></br><input value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"} name="password" maxLength={"5"} className={`${styles.search}`}></input> <br></br><br></br>
               <input onClick={login} type={"button"} value={"Sign in"} className={`${styles.btn}`}></input>
          </form>
      </div>
    );
  }

  export default Login