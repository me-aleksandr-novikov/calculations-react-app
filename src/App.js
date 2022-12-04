import Header from "./components/Header/Header";
import './index.css'
import { useState } from "react";
import  TableDate  from './components/TableDate/TableDate.jsx' 
function App() {
  const [results, setResult] = useState();
  const updateData = (value) => {
    setResult(value);
  }
  
  if(results){
  return (
    <div className="App">
      <Header updateData = {updateData}/>
      <TableDate results = {results}/>
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
