import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import "./Add.css"
function Navbar({valid,setValid}) {
    
  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <h6 class="navbar-brand"  id="heading">Daily Report</h6>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <Link to="/" class="nav-link" >Home <span class="sr-only">(current)</span></Link>
            </li>
            {valid &&
                <li class="nav-item">
                    <Link to="/adduser" class="nav-link" href="#">Add Employee</Link>
                </li> }

            {valid &&
            <li class="nav-item">
                <Link to="/existing" class="nav-link" href="#">Update Employee</Link>
            </li>

            }
            <li class="nav-item">
                <Link to="/addreport" class="nav-link" href="#">Add report</Link>
            </li>
            <li class="nav-item">
                <Link to="/view" class="nav-link" href="#">View Report</Link>
            </li>

            {valid &&
            <li class="nav-item">
                <Link to="/task" class="nav-link" href="#">Add Task</Link>
            </li>

            }    
            </ul>
            <Link to="/login"><button className='login' >
             { valid ? "Log out" : "Log in"}
            </button></Link>
        </div>
        </nav>
    </>
  )
}

export default Navbar