import Header from "./components/Header/Header";
import './index.css'
import { useState } from "react";
import  TableDate  from './components/TableDate/TableDate.jsx' 

function App() {

  const [results, setResult] = useState();
  const [Empl, setEmpl] = useState({});
  const updateData = (value, Emp, dateStart, dateEnd) => {
    setResult(value);
    setEmpl({Emp, dateStart, dateEnd});
  }
  
  if(results && results.length){
  return (
    <div className="App">
      <Header updateData = {updateData}/>
      <TableDate results = {results} Empl = {Empl}/>
    </div>
  );
  } else {
    return (
      <div className="App">
        <Header updateData = {updateData}/>
      </div>
    );
  }
}

export default App;
