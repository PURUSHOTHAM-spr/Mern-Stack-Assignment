import { useLocation } from 'react-router-dom'

function Product() {

  const location = useLocation()
  const product = location.state?.product   // safe access

  if (!product) {
    return <p className="text-center text-2xl mt-10">No product found</p>
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between mt-14 px-10'>
      <div className='sm:w-2/5'>
        <img src={product.image} className='w-96 mx-auto' alt="" />
      </div>

      <div className='sm:w-3/5 p-2 sm:p-10'>
        <p className='text-2xl mb-10'>{product.title}</p>
        <p className='mb-10'>{product.description}</p>
        <p className='text-3xl mb-10'>${product.price}</p>
        <p className='text-2xl mb-10'>{product.category}</p>
      </div>
    </div>
  )
}

export default Product