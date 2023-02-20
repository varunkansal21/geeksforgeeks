import React, {useState} from 'react'
import './Home.css'
import { Link, NavLink } from 'react-router-dom'
import Navbar from './Navbar'

function Home({valid,setValid}) {
  return (
    <>
    <Navbar valid={valid} setValid={setValid}/>
    <div className='body'>
      
        <h1 className='Main'>
            TEAM REPORT
        </h1>
        {valid &&
        <Link to="/adduser">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>ADD EMPLOYEE</button>
        </Link>}

        {valid && 
        <Link to="/existing">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>UPDATE EMPLOYEE</button>
        </Link>

}

        <Link to="/addreport">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>ADD REPORT</button>
        </Link>
        <Link to="/view">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>VIEW REPORT</button>
        </Link>
        
    </div>
    </>
  )
}

export default Home