import React from 'react'
import Navbar from "./Navbar";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css'

function AddTask() {

  const [credentials1, setCredentials1] = useState({task:""});
  let navigate1 = useNavigate();

  const handleSignup = async (e)=>{
    e.preventDefault();

    if(document.getElementById("task").value.length<=2){
      window.alert("Task should be atleast of 3 characters");
      return;
    }
    if(window.confirm("Are you sure the task entered is correct ? ")===false){
      return;
    }
    
    const {task} = credentials1;
    const response = await fetch("http://0.0.0.0:3000/addTask", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },

        body: JSON.stringify({task})

    });
    const json = await response.json();
    if(json.status === 200){
        alert("Task added!")
        navigate1('/');
        
    }
    else{
        alert("Internal Server error");
    } 
}


  const onChange1 = (e)=>{
    setCredentials1({...credentials1, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
  }


  return (
    <>
        <Navbar/>
        <div className='form'>
            <h1 id="overHeading">Add Task</h1>
            <form onSubmit={handleSignup} className="mainForm">
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Task Name *</label>
                    <input type="text" name="task" class="form-control" id="task" placeholder="Task Name" onChange={onChange1}/>
                    </div>
                    
                </div>
                <button type="submit" class="btn btn-primary" >Add</button>
            </form>
        </div>
    </>
  )
}

export default AddTask