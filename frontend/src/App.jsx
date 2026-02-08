import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div className="bg-sky-500" onClick={handleClick}>
        {count}
      </div>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
