import React,{useState} from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import gfg from "../images/gfg.jpeg"
import { Link } from 'react-router-dom';

function Signup({valid,setValid}) {
    let navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogIn= async(e)=>{
        e.preventDefault();

        if(document.getElementById("email").value.length===0){
            window.alert("Please enter your email address");
            return;
        }
        if(document.getElementById("password").value.length<5){
            window.alert("Please enter your password of at least 5 words");
            return;
        }

        const response= await fetch("http://localhost:5000/signup",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({email,password})
        });
        console.log(email,password);
        const json= await response.json();
        if(json.status===200){
          localStorage.setItem('token', json.authToken);
            setValid(true);
            navigate('/')
        }

        else{
            window.alert("Account already exist with this Email ID")
        }
        


    }

  return (
    <>
      <div id="otp_container">
        <div id="otp_create">
          <img src={gfg} alt=".." id="logo_otp_create"/>
          <h2 id="otp_heading">Sign Up</h2>
            <input type="text" name="email"  id="email" className="create_input" onChange={(e)=>setEmail(e.target.value)}placeholder='Enter Email'/>
            <input type="password" name="password" id="password" className="create_input"onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            <button onClick={handleLogIn} id="create_button">Submit</button>
            <Link to="/login"><p id="line_move"><span style={{color:"black"}}>Have an account ?</span> Sign in</p></Link>
        </div>
        
      </div>  
    </>
  )
}

export default Signup