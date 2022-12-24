import React from 'react'
import { Link } from 'react-router-dom'
import "./Add.css"
function Navbar() {
  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#" id="heading">Daily Report</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <Link to="/" class="nav-link" >Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
                <Link to="/adduser" class="nav-link" href="#">Add Employee</Link>
            </li>
            <li class="nav-item">
                <Link to="/existing" class="nav-link" href="#">Update Employee</Link>
            </li>
            <li class="nav-item">
                <Link to="/addreport" class="nav-link" href="#">Add report</Link>
            </li>
            <li class="nav-item">
                <Link to="/view" class="nav-link" href="#">View Report</Link>
            </li>

            </ul>
        </div>
        </nav>
    </>
  )
}

export default Navbar