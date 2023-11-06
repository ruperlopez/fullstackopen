import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

/**
const Display = (props) => {
  return <div>{props.counter}</div>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
*/
const Display = ({ counter }) => <div>{counter}</div>

// cambiamos onSmash para probar
const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

const App = () => {
  /**
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);

  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);
*/
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };

  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };

  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };
  return (
    <div>
      <Display counter={counter} />

      <Button onSmash={increaseByOne} text="plus" />
      <Button onSmash={setToZero} text="zero" />
      <Button onSmash={decreaseByOne} text="minus" />
    </div>
  );
};

export default App;
