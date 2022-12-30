import Home from './components/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Add from './components/Add';
import UpdateEmployee from "./components/UpdateEmployee"
import AddReport from './components/AddReport';
import ViewReport from './components/ViewReport';
import SuperView from './components/SuperView';
import AddTask from './components/AddTask';

function App() {
  
  return (
   <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/adduser" element={<Add/>}/>
        <Route exact path="/existing" element={<UpdateEmployee/>}/>
        <Route exact path="/addreport" element={<AddReport/>}/>
        <Route exact path="/view" element={<ViewReport/>}/>
        <Route exact path="/superView" element={<SuperView/>}/>
        <Route exact path="/task" element={<AddTask/>}/> 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
