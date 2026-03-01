import React, { useState } from "react";

const StateDemo = () => {
  const [counter, setCounter] = useState(0);
  const [marks, setMarks] = useState([1, 2]);

  const [user, setUser] = useState({
    name: "spr",
    age: 25,
    city: "hyderabad"
  });

  const increment = () => {
    setCounter(prev => prev + 1);
  };

  const addMarks = () => {
    setMarks(prev => [...prev, 99]);
  };

  // delete mark by index
  const deleteMarks = (index) => {
    const result = marks.filter((_, i) => i !== index);
    setMarks(result);
  };

  // delete "age" property from user
  const deleteProperty = () => {
    const { age, ...rest } = user;
    setUser(rest);
  };

  return (
    <div>
      <h3>Counter: {counter}</h3>
      <button 
        onClick={increment}
        className="bg-amber-100 py-3 px-5 m-2"
      >
        Inc
      </button>

      <h3>Marks:</h3>
      {marks.map((mark, index) => (
        <div key={index}>
          {mark}
          <button
            onClick={() => deleteMarks(index)}
            className="bg-red-200 py-1 px-3 m-2"
          >
            Delete
          </button>
        </div>
      ))}

      <button 
        onClick={addMarks}
        className="bg-amber-100 py-3 px-5 m-2"
      >
        Add Marks
      </button>

      <hr />

      <h3>User:</h3>
      <p>{JSON.stringify(user)}</p>

      <button 
        onClick={deleteProperty}
        className="bg-blue-200 py-3 px-5 m-2"
      >
        Delete Age Property
      </button>
    </div>
  );
};

export default StateDemo;