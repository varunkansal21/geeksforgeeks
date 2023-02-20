import Home from './components/Home';
import {useState} from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Add from './components/Add';
import UpdateEmployee from "./components/UpdateEmployee"
import AddReport from './components/AddReport';
import ViewReport from './components/ViewReport';
import SuperView from './components/SuperView';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Signup from './components/Signup';





function App() {

  const [valid,setValid]= useState(true);
  
  return (
   <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home valid={valid} setValid={setValid}/>}/>
        {valid &&
          <Route exact path="/adduser" element={<Add/>}/>
        }
        {valid &&
          <Route exact path="/existing" element={<UpdateEmployee/>}/>
        }
        {valid &&
          <Route exact path="/superView" element={<SuperView/>}/>
        }
        {valid &&
          <Route exact path="/task" element={<AddTask/>}/> 
        }
        

        <Route exact path="/addreport" element={<AddReport/>}/>
        <Route exact path="/view" element={<ViewReport/>}/>
        
      
        <Route exact path="/login" element={<Login valid={valid} setValid={setValid}/>}/> 
        <Route exact path="/Signup" element={<Signup valid={valid} setValid={setValid}/>}/> 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
