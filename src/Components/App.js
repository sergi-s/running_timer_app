import React, { useState } from "react";
import Card from "./Card";

function App() {
  setInterval(getTime, 1000);
  //training
  const [initTime, setTime] = useState(new Date());
  const [initStartT, setStartT] = useState();
  const [initTraining, setTraining] = useState();
  const [isTraining, setIsTraining] = useState(0);

  //run
  const [arr, setarr] = useState([{ Started: new Date(), Time: "0" }]);
  const [isRunning, setisRunning] = useState(false);
  const [initRun, setRun] = useState(initStartT);
  //Data
  const [Percent, setPercent] = useState(0);
  function handle(event) {
    setRun(new Date());
    setarr((prevItems) => {
      setisRunning(!isRunning);
      const now = new Date();
      const Time = Math.floor(now - prevItems[prevItems.length - 1].Started);
      const obj = { Started: now, Time };
      //event.preventDefault();
      event.persist();
      return [...prevItems, obj];
    });
  }

  function startTraining(event) {
    if (isTraining === 0) {
      const now = new Date();
      setStartT(now);
      setIsTraining(1);
      setRun(now);
    }
    if (isTraining === 1) {
      setisRunning(false);
      setIsTraining(2);
      if (arr.length <= 2) return;
      let sum = 0;
      arr.forEach((element, index) => {
        if (index % 2 === 0 && index !== 0) sum += element.Time;
      });
      setPercent(
        ((sum * 100) / (arr[arr.length - 1].Started - arr[1].Started)).toFixed(
          2
        )
      );
    }
    if (isTraining === 2) {
      setarr([{ Started: new Date(), Time: "0" }]);
      setIsTraining(0);
    }
    setTraining(new Date());
    //event.preventDefault();
    event.persist();
  }
  function getTime() {
    setTime(new Date());
  }
  function formatTime(A, B) {
    return (
      Math.floor((A - B) / 3600000) +
      ":" +
      Math.floor((A - B) / 60000) +
      ":" +
      (Math.floor((A - B) / 1000) % 60)
    );
  }
  function formatTimeNormal(A) {
    return (
      Math.floor(A / 3600000) +
      ":" +
      Math.floor(A / 60000) +
      ":" +
      (Math.floor(A / 1000) % 60)
    );
  }

  return (
    <div>
      <div className='formm'>
        <div>
          <h1>{initTime.toLocaleDateString()}</h1>
          <h2>{initTime.toLocaleTimeString()}</h2>
          <button onClick={startTraining}>
            {" "}
            Press to{" "}
            {isTraining === 0
              ? "Start Training"
              : isTraining === 1
              ? "End Training"
              : "Reset"}
          </button>
        </div>
      </div>
      <div className='formm'>
        <h1>
          {isTraining === 1
            ? formatTime(initTime, initTraining)
            : isTraining === 0
            ? "To start Training press 👆"
            : formatTime(initTraining, initStartT)}
        </h1>
      </div>

      <div className='formm'>
        <h2>
          {isTraining === 1
            ? formatTime(new Date(), initRun)
            : isTraining === 0
            ? "When You are ready press the first yellow buttom"
            : "Well Done"}
        </h2>
        <button
          style={
            isRunning
              ? { backgroundColor: "#f7e7bd" }
              : { backgroundColor: "#f5ba13" }
          }
          onClick={isTraining === 1 ? handle : () => null}
        >
          {isTraining === 1
            ? isRunning
              ? "Press to Take a Break"
              : "Press to Start Running"
            : "You are not Training"}
        </button>
      </div>
      {isTraining === 2 ? (
        <div className='formm'>
          <h4>You ran {Percent}% of your training Time</h4>
        </div>
      ) : (
        ""
      )}
      {arr.map((element, index) => {
        if (index < 2) return null;
        return (
          <Card
            key={index}
            Started={element.Started.toLocaleTimeString()}
            Time={formatTimeNormal(element.Time)}
            State={index % 2 ? "Break" : "Run"}
          />
        );
      })}
    </div>
  );
}
export default App;
