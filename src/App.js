import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Add from './components/Add';
import UpdateEmployee from "./components/UpdateEmployee"

function App() {
  return (
   <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/adduser" element={<Add/>}/>
        <Route exact path="/existing" element={<UpdateEmployee/>}/>
        <Route exact path="/addreport" element={<Add/>}/>
        <Route exact path="/view" element={<Add/>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
