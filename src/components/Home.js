import React from 'react'
import './Home.css'
import { Link, NavLink } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  return (
    <>
    <Navbar/>
    <div className='body'>
      
        <h1 className='Main'>
            TEAM REPORT
        </h1>
        <Link to="/adduser">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>NEW EMPLOYEE</button>
        </Link>
        <Link to="/update">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>UPDATE EMPLOYEE</button>
        </Link>
        <Link to="/addreport">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>ADD REPORT</button>
        </Link>
        <Link to="view">
                <button type="button" class="btn btn-outline-secondary" id='employee_button'>VIEW REPORT</button>
        </Link>
        
    </div>
    </>
  )
}

export default Home