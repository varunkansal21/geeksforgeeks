import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Add.css'

function AddReport() {
    const [credentials2, setCredentials2] = useState({id:""});
    const [credentials1, setCredentials1] = useState({Name:"", task: "", success:"", unsuccess:"", total:"", others:""});
    let navigate1 = useNavigate();
    const handleReport = async (e)=>{
        e.preventDefault();
        const {id}= credentials2;
        const {Name,task,success,unsuccess,total,date,others} = credentials1;
        const response = await fetch("http://localhost:5000/addReport", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({id,Name,task,success,unsuccess,total,others})

        });
        const json = await response.json();
        console.log("hello");
        if(json.status === 200){
            // Save the auth Token and redirect
            localStorage.setItem('token', json.authToken);
            alert("Report added!")
            navigate1('/');
            
        }
        else{
            alert("Please enter all the details correctly");
        }
        // console.log(json);  
    }

    var [users,setUsers] = useState([]);
    
    const handleFetch = async (e)=>{
        e.preventDefault();
        console.log("hello");
        const {id} = credentials2;
        const response = await fetch("http://localhost:5000/employeeData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({id})

        });
        users = await response.json();
        setUsers(users);
        document.getElementById("id").value=users[0].ID;
        document.getElementById("name").value=users[0].NAME;

        document.getElementById("id").disabled=true;
    }

    const onChange1 = (e)=>{
        setCredentials1({...credentials1, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
    }
    
    const onChange2 = (e)=>{
        setCredentials2({...credentials2, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
    } 

        useEffect(() => {
            fetchUsers1();
          }, []);

        const [tasks,setTasks] = useState([]);
        const fetchUsers1 = async() => {
          const data = await fetch('http://localhost:5000/showTasks');
          const tasks =await data.json();
          setTasks(tasks);
          
        }
  return (
    <>
        <Navbar/>
        <div className='form'>
            <h1>Add Report</h1>
            <form onSubmit={handleFetch} >
                <label for="inputName4">Employee Id *</label>
                <div style={{"width":"47%","display":"flex"}}>
                    <input type="number" name="id" class="form-control" id="id" placeholder="Employee Id" onChange={onChange2} disabled={false} />
                    <button type="submit"  class="btn btn-primary">Fetch</button>
                </div>
            </form>
            <form onSubmit={handleReport}>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Name</label>
                    <input type="text" name="Name" id="name" class="form-control" placeholder='Name' onChange={onChange1} disabled/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Task </label>
                    <select id="task" class="form-control" name="task"  onChange={onChange1}>
                        <option>
                            Choose...
                        </option>
                        {
                            tasks.map(task =>(
                                <option>
                                    {task.NAME}
                                </option>
                            ))
                        }
                    </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Successful</label>
                    <input type="number" name="success" class="form-control"  placeholder="Successful" onChange={onChange1}/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Unsuccessful</label>
                    <input type="number" name="unsuccess" class="form-control"  placeholder="Unsuccessful" maxlength={10}onChange={onChange1}/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Total</label>
                    <input type="number" name="total" class="form-control"  placeholder="Total" onChange={onChange1}/>
                    </div>
                    {/* <div class="form-group col-md-6">
                    <label for="inputPassword4">Date</label>
                    <input type="date" name="date" class="form-control"  placeholder="date" maxlength={3}onChange={onChange1}/>
                    </div> */}
                    
                </div>
                <div class="form-group">
                    <label for="inputAddress">Extra work</label>
                    <textarea type="text" class="form-control" name="others"  placeholder="Others"  onChange={onChange1}/>
                </div>
                
                <button type="submit" class="btn btn-primary" >Add</button>
            </form>
        </div>
    </>
  )
}

export default AddReport