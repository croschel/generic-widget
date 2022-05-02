import { useState } from "react";
import { Widget } from "./components/Widget";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Widget />
    </div>
  );
}

export default App;
