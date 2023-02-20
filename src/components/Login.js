import React,{useState} from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import gfg from "../images/gfg.jpeg"
import { Link } from 'react-router-dom';
// import { ReactSession } from 'react-client-session';

// ReactSession.setStoreType("localStorage");

function Login({valid,setValid}) {
    let navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [fetch1,setFetch1]=useState("");

    const handleLogIn= async(e)=>{
        e.preventDefault();

        if(document.getElementById("email").value.length===0){
            window.alert("Please enter your email address");
            return;
        }
        if(document.getElementById("password").value.length<5){
            window.alert("Please enter your password");
            return;
        }

        const response= await fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },

            body: JSON.stringify({email,password})
        });

        const fetch2= await response.json();
        if(fetch2.status){
          localStorage.setItem('token', fetch2.authToken);
            setValid(true);
            navigate('/')
        }

        else{
            window.alert("Please enter your correct credentials");
        }
        


    }

  return (
    <>
      <div id="otp_container">
        <div id="otp_create">
          <img src={gfg} alt=".." id="logo_otp_create"/>
          <h2 id="otp_heading">Sign in</h2>
            <input type="text" name="email"  id="email" className="create_input" onChange={(e)=>setEmail(e.target.value)}placeholder='Enter Email'/>
            <input type="password" name="password" id="password" className="create_input"onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            <button onClick={handleLogIn} id="create_button">Submit</button>
            <Link to="/signup"><p id="line_move"><span style={{color:"black"}}>Don't have an account ?</span> Create Account</p></Link>
            <Link to="/forgot"><p id="line_move">Forgot Password ?</p></Link>
        </div>
        
      </div>  
    </>
  )
}

export default Login