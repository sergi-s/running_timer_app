import React, { useState } from "react";
import Card from "./Card";

function App() {
  setInterval(getTime, 1000);
  const [BUTT, setBUTT] = useState(true);
  const [initSate, setSate] = useState(
    new Date().toLocaleTimeString().replace("AM", "").replace("PM", "")
  );

  const [list, setlist] = useState([{ Started: initSate, Time: "0" }]);

  function handle(event) {
    setlist((prevItems) => {
      setBUTT(!BUTT);
      var A = ReturnToNumber(initSate);
      var B = ReturnToNumber(prevItems[prevItems.length - 1].Started);

      const Time = Math.floor((A - B) / 60) + ":" + ((A - B) % 60);

      const obj = { Started: initSate, Time };
      event.preventDefault();
      return [...prevItems, obj];
    });
  }

  function getTime() {
    setSate(
      new Date().toLocaleTimeString().replace("AM", "").replace("PM", "")
    );
  }

  function ReturnToNumber(a) {
    var arr = a.split(":");
    return (
      parseInt(arr[0]) * 60 * 60 + parseInt(arr[1]) * 60 + parseInt(arr[2])
    );
  }

  return (
    <div>
      <div className='formm'>
        <h1>{initSate}</h1>
        <button onClick={handle}>
          {" "}
          Press to {BUTT ? "Start Running" : "Take a break"}{" "}
        </button>
      </div>

      {list.map((element, index) => {
        if (index < 1) return null;
        return (
          <Card
            key={index}
            Started={element.Started}
            Time={element.Time}
            State={index % 2 ? "Break" : "Run"}
          />
        );
      })}
    </div>
  );
}

export default App;
