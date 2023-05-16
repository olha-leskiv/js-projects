import Form from "./components/Form";
import ResultBoard from "./components/ResultBoard";
import { useEffect, useState } from "react";
import './scss/style.scss';
import logoImg from "./images/logo.svg";

function App() {
  const [result, setResult] = useState({
    total: 0,
    tip: 0
  })
  const [inputs, setInputs] = useState({
    amount: "",
    tip: 0,
    people: 1
  });

  const [isCustom, setIsCustom] = useState(false);

  const handleChange = (event) => {
    if(isCustom && event.target.type == "radio") {
      setIsCustom(false)
    }
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleClick = (event) => {
    setIsCustom(true);
    event.target.focus(); 
  }

  const handleBlur = () => {
    if(!inputs.tip) {
      setIsCustom(false)
    }
  }
  
  useEffect(() => {
    if(isCustom) {
      setInputs(values => ({...values, tip: ""}));
    }
  }, [isCustom] )

  useEffect(() => { 
    let person = inputs.amount / inputs.people; 
    let tip = person * inputs.tip / 100; 
    let total = person + tip;

    if(!total) total = 0;
    if(!tip) tip = 0;

    setResult({
      total: total.toFixed(2),
      tip: tip.toFixed(2)
    })
  }, [inputs])

  const reset = () => {
    setInputs({
      amount: "",
      tip: 0,
      people: 1
    });
    setIsCustom(false);
  }

  return (
    <div className="App">
      <img src={logoImg}></img>
      <div className="container">
        <Form inputs={ inputs } onChange={ handleChange } isCustom={ isCustom } onClick={handleClick} onBlur={ handleBlur } />
        <ResultBoard result={ result } onClick={ reset }/>
      </div>
    </div>
  );
}

export default App;
