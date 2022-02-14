import styles from "../styles/results.module.css"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
    const [role, setRole] = useState(null)
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('user')).role);
        setRole(JSON.parse(localStorage.getItem('user')).role)
    }, [])
    
    return (
        <div className={`${styles.nav}`}>
            <b>ABJ-N</b>
            <div style={{ display: 'flex' }}>
                {role == 'monitor' && <Link to={'/add-student'}> <b style={{marginRight:'1rem'}} className={`${styles.text}`}>Add student</b> </Link>}
            <Link to={'/login'}> <b className={`${styles.text}`}>Logout</b> </Link>
            </div>
        </div>
      
    );
  }

  export default Navbar