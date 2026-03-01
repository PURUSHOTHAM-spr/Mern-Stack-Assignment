import "./App.css";
import Test1 from "./components/Test1";

function App() {

  const messages = [
    {
      message1: "good morning",
      message2: "hello"
    },
    {
      message1: "good afternoon",
      message2: "hi"
    },
    {
      message1: "good evening",
      message2: "hey"
    }
  ];

  return (
    <div className="text-center border-b-2 bg-gray-200">
      <h1 className="text-5xl text-blue-400">Welcome to React</h1>

      {
        messages.map((msgObj, index) => (
          <Test1 
            key={index}
            message1={msgObj.message1}
            message2={msgObj.message2}
          />
        ))
      }

    </div>
  );
}

export default App;