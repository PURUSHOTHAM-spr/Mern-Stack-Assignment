function Product({ product }) {
  return (
    <div className="bg-white ">

      <img src={product.image}alt={product.name}className=" object-cover"/>

      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-xl ">{product.name}</h2>

        <p className="text-sm">{product.brand}</p>

        <p className="text-sm text-gray-600 ">
          {product.description}
        </p>

        <p className=" text-blue-600">
          {product.price}
        </p>
      </div>
    </div>
  );
}

export default Product;