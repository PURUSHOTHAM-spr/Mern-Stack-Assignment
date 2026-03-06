import { useContext } from "react"
import { CounterContext } from "../contexts/CounterContext"

function C() {
  const { counter1, changeCounter1 } = useContext(CounterContext)

  return (
    <div className="text-center shadow-2xl p-10">
      <p className="text-3xl">Counter C</p>
      <p className="text-2xl mt-8">Counter1: {counter1}</p>

      <button 
        onClick={changeCounter1}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Increment
      </button>
    </div>
  )
}

export default C