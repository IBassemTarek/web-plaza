import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { t } = useLocale();

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
      <div className="flex flex-col h-[100%]">
        <Link className="flex-grow" href={`/product/${product._id}`}>
          <div className="flex flex-col">
            <div className="flex">
              <Image
                src={
                  product?.images[0]
                    ? product?.images[0].url
                    : "/images/default_product.png"
                }
                alt={product.name}
                className="object-cover rounded w-full"
                width={144}
                height={144}
              />
            </div>
            <div className="px-4 pt-4 flex-grow">
              {product?.name.substring(0, 50)}...
              <p className="text-gray-500 pt-2">
                {product?.description.substring(0, 100)}...
              </p>
            </div>
          </div>
        </Link>
        <div className="flex justify-between relative pt-2">
          <div className="px-5 pb-5">
            <span className="text-xl font-semibold text-black">
              ${product?.price}
            </span>

            <p className="text-green-500 pb-8">{t("Free Shipping")}</p>
          </div>
          <a
            className="absolute bottom-0 right-0 px-4 py-2 inline-block text-white bg-black border-transparent rounded-br-md rounded-tl-md  cursor-pointer hover:bg-gray-800"
            onClick={addToCartHandler}
          >
            {" "}
            {t("add_to_cart")}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
