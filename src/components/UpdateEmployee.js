import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css'
import Navbar from './Navbar';

function Add() {

  const [credentials2, setCredentials2] = useState({id:""});
  const [credentials1, setCredentials1] = useState({ Name: "", doj:"", dol:""});
  let navigate1 = useNavigate();


  const handleSignup = async (e)=>{
    e.preventDefault();
    if(window.confirm("Are you sure the details updated are correct ? ")==false){
        return;
      }
    const {id}= credentials2;

    const  Name=document.getElementById("name").value;
    const doj=document.getElementById("doj").value;
    const dol=document.getElementById("dol").value;
    const response = await fetch("http://localhost:5000/updateEmployee", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },

        body: JSON.stringify({id,Name,doj,dol})

    });
    const json = await response.json();
    if(json.status === 200){
        alert("Employee Updated!")
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
        console.log(users[0]);
        document.getElementById("id").value=users[0].ID;
        document.getElementById("name").value=users[0].NAME;
        var today = new Date(users[0].DOJ.slice(0,10));
        var tomorrow = new Date(today);
        tomorrow.setDate(today.getUTCDate()+1);
        tomorrow.setMonth(today.getUTCMonth());
        var current= today.getFullYear()+"-"+(today.getUTCMonth()+1)+"-"+tomorrow.getDate();
        document.getElementById("doj").value=current;
        if(users[0].DOL==null){
            document.getElementById("dol").value=null; 
        }
        else{
            var today = new Date(users[0].DOL.slice(0,10));
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getUTCDate()+1);
            tomorrow.setMonth(today.getUTCMonth());
            var current= today.getFullYear()+"-"+(today.getUTCMonth()+1)+"-"+tomorrow.getDate();
            document.getElementById("dol").value=current;
            document.getElementById("dol").disabled=true;
            document.getElementById("update").disabled=true;
        }
        document.getElementById("id").disabled=true;
    }
    

const onChange1 = (e)=>{
    setCredentials1({...credentials1, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
}       
  
const onChange2 = (e)=>{
    setCredentials2({...credentials2, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
} 

  return (
    <>
    <Navbar/>
      <div className='form'>
            <h1>Update Employee Details</h1>
            <form onSubmit={handleFetch} >
                <label for="inputName4">Employee Id *</label>
                <div style={{"width":"47%","display":"flex"}}>
                    <input type="number" name="id" class="form-control" id="id" placeholder="Employee Id" onChange={onChange2} disabled={false} />
                    <button type="submit"  class="btn btn-primary">Fetch</button>
                </div>
            </form>
            <form onSubmit={handleSignup} className="mainForm">
                <div class="form-row">
                    
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Name *</label>
                    <input type="text" name="Name" class="form-control" id="name" disabled  placeholder="Name" onChange={onChange1} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputName4">Date of Joining *</label>
                    <input type="date" name="doj" class="form-control" id="doj" placeholder="" disabled onChange={onChange1} />
                    </div>
                </div>
                <div class="form-row">
                    
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Date of Leaving</label>
                    <input type="date" name="dol" class="form-control" id="dol" placeholder="" disabled={false} onChange={onChange1} />
                    </div>
                </div>
                <button type="submit" id="update" class="btn btn-primary" disabled={false} >Update</button>
            </form>
        </div>
    </>
  )
}

export default Add