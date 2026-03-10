import { useContext } from "react"
import { CounterContext } from "../contexts/CounterContext"
import { UserContext } from "../contexts/UserContext"
import { useTest } from "../store/TestStore"

function A() {
  const { counter1, changeCounter1 } = useContext(CounterContext)
  const { counter2, changeCounter2 } = useContext(CounterContext)
  const {user1,changeUser1}=useContext(UserContext)
  const {x,incrementX,decrementX}=useTest()
  const incrementXByValue = useTest(state => state.incrementXByValue)


  return (
    <div className="text-center shadow-2xl p-10 flex-col justify-around rounded-2xl bg-blue-300">
      <p className="text-3xl">Counter B</p>
      <p className="text-2xl mt-8">Counter1: {counter1}</p>
      <p className="text-2xl mt-8">Counter1: {counter2}</p>
      <p className="text-2xl mt-8 bg-amber-300 text-red-500" >X: {x}</p>
      
      <br />
      {/* <p className="text-2xl mt-8"> user1</p>
      <p>Name: {user1.name}</p>
      <p>Age: {user1.age}</p>
      <p>Email: {user1.email}</p>
       */}

      <button 
        onClick={changeCounter1}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Increment
      </button>
      <button 
        onClick={incrementX}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        IncrementX
      </button>
      <br />
      <button 
        onClick={() => incrementXByValue(100)}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        IncreX By Value
      </button>
      <br />
      <button 
        onClick={changeCounter2}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Increment
      </button>
      
      {/* <button 
        onClick={changeUser1}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Modify
      </button> */}
    </div> 
  )
}

export default A