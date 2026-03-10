import { useContext } from "react"
import { CounterContext } from "../contexts/CounterContext"
import { useTest } from "../store/TestStore"

function C() {

//get state from zustang and store
// const x = useTest(state => state.x)
// console.log(" x is",x)
const {y,incrementY,decrementY}=useTest()
console.log(" Y is",y)
const{updateUser,user}=useTest()
  const { counter1, changeCounter1 } = useContext(CounterContext)

  return (
    <div className="text-center shadow-2xl p-10 rounded-2xl bg-green-300">
      <p className="text-3xl">Counter C</p>
      <p className="text-2xl mt-8">Counter1: {counter1}</p>
      <p className="text-2xl mt-8">Name: {user.name}</p>
     <p className="text-2xl mt-2">Age: {user.age}</p>

      <p className="text-2xl mt-8 bg-amber-300 text-red-500">Y: {y}</p>

      <button 
        onClick={changeCounter1}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Increment
      </button>
      <br />
      <button 
        onClick={incrementY}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        IncrementY
      </button>
      <button 
        onClick={updateUser}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        change user
      </button>
    </div>
  )
}

export default C