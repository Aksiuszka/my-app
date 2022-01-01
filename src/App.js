import React, {useState, useRef, useEffect, useReducer} from 'react';
import axios from 'axios';

function App() {
  const [counter, setCounter] = useState(0);
  const addCounter = ()=>{
    setCounter(counter+9);
  }
  const [input, setInput] = useState([]);
  const addInput = (event) => {
    let newInput = event.target.value;
    setInput(newInput)
  }
  const reducer = (state, action) =>{
      switch(action.type){
        case "INCREMENT":
          return {counting: state.counting+1, showText: state.showText};
        case "TOGGLE":
          return {counting: state.counting, showText: !state.showText};
        default:
          return state;
      }
  }
  const [state, dispatch] = useReducer(reducer, {counting: 0, showText:true});
  const [data, setData] = useState("");
  const [number, setNumber] = useState(0);
  useEffect(()=>{
    axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((response) => {
      setData(response.data[0].email);
    }
  )},[]);

  const inputRef = useRef(null);
  const wykasujTo = () =>{
    inputRef.current.value = "";
  }

  return (
    <div className="App">
     <div className="useState">
       <h1>UseState</h1>
       <h2>Counter</h2>
       <div>{counter}</div>
       <button onClick={addCounter}>Dodaj 9</button>

       <h2>Insert text that you want</h2>
       <label for="fname">Wpisz, co chcesz</label>
      <input type="text" id="fname" name="fname" onChange={addInput}></input>
       <div>Wpisz :{input}</div>
     </div>

     <div className="useReducer">
       <h1>UseReducer</h1>
       <div>{state.counting}</div>
       <button onClick={()=>{
         dispatch({type: "INCREMENT"});
         dispatch({type: "TOGGLE"});
       }}>kliknij mnie, żeby inkrementować liczbę i toglować napis</button>
       {state.showText && <p>Widzisz Mnie</p>}
     </div>

     <div className="useEffect">
     <h1>UseEffect i axios</h1>
       <h3>{data}</h3>
       <h3>{number}</h3>
       <button onClick={()=>setNumber(number+1)}>Counter ++</button>
       </div>

       <div className="useRef">
     <h1>UseRef</h1>
     <input type="text" id="fname" name="fname" ref={inputRef}></input><button onClick={wykasujTo}>Kliknij, żeby wymazać i wpisać od nowa! </button>
       </div>

       <div className="useContext">
     <h1>UseContext</h1>
     <p>logowanie</p>
       </div>

     </div>

  );
}

export default App;
