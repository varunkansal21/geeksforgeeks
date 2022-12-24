import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ViewReport() {

  const [credentials1, setCredentials1] = useState({id:"", Name: "", task:"",from:"", to:""});
  let navigate1 = useNavigate();


  var [users,setUsers] = useState([]);
    
  const handleFetch = async (e)=>{
      e.preventDefault();
      console.log("hello");
      const {id,Name,task,from,to} = credentials1;
      if(task==="All"){
        const response = await fetch("http://localhost:5000/showAllReport", {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },

          body: JSON.stringify({id,Name,task,from,to})

      });
        users = await response.json();
      }
      else{
      const response = await fetch("http://localhost:5000/showParticularReport", {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },

          body: JSON.stringify({id,Name,task,from,to})

      });
      users = await response.json();
    }
      setUsers(users);
  }

  const onChange1 = (e)=>{
    setCredentials1({...credentials1, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
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
            <h1>View Report</h1>

            <Link to="/SuperView" className='super_view'>
              Enter into Super View Report
            </Link>
            <form onSubmit={handleFetch} className="mainForm">
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Employee Id *</label>
                    <input type="number" name="id" class="form-control"  placeholder="Employee Id" onChange={onChange1}/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Name *</label>
                    <input type="text" name="Name" class="form-control"  placeholder="Name" onChange={onChange1}/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Task</label>
                    <select id="task" class="form-control" name="task"  onChange={onChange1}>
                        <option disabled selected>
                          Choose..
                        </option>
                        <option>
                          All
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
                    <div class="form-group col-md-6">
                    <label for="inputName4">From Date *</label>
                    <input type="date" name="from" class="form-control"  placeholder="from" onChange={onChange1}/>
                    </div>
                    
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">To Date *</label>
                    <input type="date" name="to" class="form-control"  placeholder="to" onChange={onChange1} />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" >Get</button>
            </form>

            <table className="table table-dark table-striped" id="table" >
                <thead>
                  <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">Successful</th>
                    <th scope="col">Unsuccessful</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      users.map(user =>(
                        <tr>
                          <td>
                            {user.NAMETASK}
                          </td>
                          <td>
                            {user.SUCCESSFUL}
                          </td>
                          <td>
                            {user.UNSUCCESSFUL}
                          </td>
                          <td>
                            {user.TOTAL}
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
        </div>
    </>
  )
}

export default ViewReport