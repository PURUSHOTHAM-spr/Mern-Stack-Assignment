function Test1(props) {
  return (
    <div className="bg-amber-300 p-10 m-5">
      <p>{props.message1}</p>
      <h1>Test 1 Component</h1>
      <p>{props.message2}</p>
    </div>
  );
}

export default Test1;