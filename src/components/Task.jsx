import { useEffect, useRef, useState } from "react";
import Header from "./Header";

function Tasks() {
  const didMount = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(["Hello", "World"]);
  function handleButtonClick() {
    setMessages([...messages, inputValue]);
  }

  // componentDidUpdate
  useEffect(() => {
    if (didMount.current) {
      console.log("Updating");
    }
  });

  // componentDidMount
  useEffect(() => {
    console.log("Mounting");
    didMount.current = true;
  }, []);
  return (
    <div>
      {messages.length <= 2 && (
        <Header>
          <h1>Add a Task</h1>
        </Header>
      )}

      <input
        className="input"
        type="text"
        placeholder="Create your task..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      ></input>
      <button onClick={handleButtonClick}>Add task</button>
      <Header>
        <h2>Tasks</h2>
      </Header>
      <div>
        <ul>
          {messages.map((message) => (
            <li>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
