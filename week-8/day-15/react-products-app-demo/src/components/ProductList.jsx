import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

function Products() {

  let [product,setProducts] = useState([])
  let [updatedProd, setUpdatedProd] = useState([])
  let [loading,setLoading]=useState(false)
  let [error,setError] = useState(null)


let [selectedCategory, setSelectedCategory] = useState("all")
let [minPrice, setMinPrice] = useState(0)
let [maxPrice, setMaxPrice] = useState(1000)


const categories = [
  "all",
  ...new Set(product.map((p) => p.category))
]


  const navigate = useNavigate() 
  const {register,handleSubmit,formState:{errors}} = useForm()
  // Navigate to Product Component
  const gotoProduct = (prodObj)=>{
    // Navigation Logic
    // While Navigating, transfer Product Obj too
     navigate('/product', { state: { product: prodObj } })
    }
  
  useEffect(()=>
    {
    setLoading(true)
    async function getProducts() {
        try
        {
        let res = await fetch("https://fakestoreapi.com/products")
        if(res.status === 200)
        {
          // Extract Data
          let products = await res.json()
          // Update State
          setProducts(products)
          setUpdatedProd(products)
        }
        else
        {
          throw new Error("Failed to Fetch")
        }
      }
      catch(err)
      {
        setError(err.message)
      }
      finally
      {
        setLoading(false)
      }

    }
    getProducts()
    },[])
    
    if(loading===true)
    {
      return <p className='text-center text-2xl text-blue-300 '>Loading...</p>
    }
    if(error!==null)
    {
      return <p className='text-center text-2xl text-red-500'>{error}</p>
    }
const search = (obj) => {

  const searchValue = obj.search.toLowerCase()

  const filtered = product.filter((prodObj) => {

    const matchSearch =
      prodObj.title.toLowerCase().includes(searchValue)

    const matchCategory =
      selectedCategory === "all" ||
      prodObj.category === selectedCategory

    const matchPrice =
      prodObj.price >= minPrice &&
      prodObj.price <= maxPrice

    return matchSearch && matchCategory && matchPrice
  })

  setUpdatedProd(filtered)
} 
    
  return (
    <div>
      <form  className="text-center mt-5 " onSubmit={handleSubmit(search)}>

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="h-10 px-3 border">
    {categories.map((cat, index) => (
      <option key={index} value={cat}>{cat}</option>
    ))}


  </select>
  
  <input
    type="number"
    placeholder="Min Price"
    value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))}
     className="h-10 w-[120px] px-2 border"/>


  <input
    type="number"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))} className="h-10 w-[120px] px-2 border"/>


        <input type="text" placeholder="enter the product" className='text-center bg-gray-400 h-10 w-[300px]'{...register("search")}/>
        <button type="submit" className='bg-blue-400 rounded-lg px-5 py-2 ml-1.5'>Search</button>
      </form>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10 text-center'>
        {updatedProd.map((prodObj)=><div onClick={()=>gotoProduct(prodObj)} key ={prodObj.id} className='shadow-md p-10 rounded-2xl'>
          <img src={prodObj.image} className="h-44 object-contain block mx-auto mb-10"alt="" />
          <p>{prodObj.title}</p>
        </div>)}
      </div>
    </div>
  )
}

export default Products