import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      seller: product.seller,
    });
  };
  return (
    <article className="overflow-hidden bg-white shadow-lg rounded-md mb-5 group hover:scale-105 transition duration-500 ease-in-out">
      <div className="flex flex-col">
        <Link href={`/product/${product._id}`}>
          <div className="flex flex-col">
            <div className="flex">
              <Image
                src={
                  product?.images[0]
                    ? product?.images[0].url
                    : "/images/default_product.png"
                }
                alt={product.name}
                className="object-cover object-center rounded w-full h-full"
                width={200}
                height={200}
              />
            </div>
            <div className="px-4 pt-4">
              {product.name}

              <p className="text-gray-500 pt-2">
                {product?.description.substring(0, 150)}...
              </p>
            </div>
          </div>
        </Link>
        <div className="flex justify-between relative pt-2">
          <div className="pl-5 pb-5">
            <span className="text-xl font-semibold text-black">
              ${product?.price}
            </span>

            <p className="text-green-500">Free Shipping</p>
          </div>
          <a
            className="absolute bottom-0 right-0 px-4 py-2 inline-block text-white bg-black border-transparent rounded-br-md rounded-tl-md  cursor-pointer z-50 hover:bg-gray-800"
            onClick={addToCartHandler}
          >
            {" "}
            Add to Cart{" "}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
