"use client";

import React, { useContext } from "react";

import CartContext from "@/context/CartContext";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import Image from "next/image";
const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart, saveOnCheckout } =
    useContext(CartContext);
  const { t } = useLocale();

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    addItemToCart(item);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2);

  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  const checkoutHandler = () => {
    const data = {
      amount: amountWithoutTax,
      tax: taxAmount,
      totalAmount,
    };

    saveOnCheckout(data);
  };

  return (
    <>
      <section className="py-5 sm:py-7 bg-black">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2 text-white">
            {cart?.cartItems?.length || 0} {t("Item(s) in Cart")}
          </h2>
        </div>
      </section>

      {cart?.cartItems?.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap lg:flex-row gap-5 mb-4"
                    >
                      <div className="w-full lg:w-2/5 xl:w-2/4">
                        <div className="flex leading-5">
                          <div>
                            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                              <Image
                                src={
                                  cartItem.image
                                    ? cartItem.image
                                    : "/images/default_product.png"
                                }
                                className="object-cover w-full h-full"
                                alt={cartItem.name}
                                width={64}
                                height={64}
                              />
                            </div>
                          </div>
                          <figcaption className="ml-3">
                            <p>{cartItem.name}</p>
                            <p className="mt-1 text-gray-400">
                              {" "}
                              {t("Seller")}: {cartItem.seller}
                            </p>
                          </figcaption>
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                          <button
                            data-action="decrement"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-s-lg cursor-pointer outline-none"
                            onClick={() => decreaseQty(cartItem)}
                          >
                            <span className="m-auto text-2xl font-thin select-none">
                              -
                            </span>
                          </button>
                          <div className="bg-gray-300 w-full font-semibold text-md flex items-center justify-center text-gray-900 custom-input-number select-none">
                            {cartItem.quantity}
                          </div>
                          <button
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-e-lg cursor-pointer"
                            onClick={() => increaseQty(cartItem)}
                          >
                            <span className="m-auto text-2xl font-thin select-none">
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="leading-5">
                          <p className="font-semibold not-italic">
                            ${cartItem.price * cartItem.quantity.toFixed(2)}
                          </p>
                          <small className="text-gray-400">
                            {" "}
                            ${cartItem.price}
                          </small>
                        </div>
                      </div>
                      <div className="flex-auto">
                        <div className="float-right">
                          <a
                            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              deleteItemFromCart(cartItem?.product)
                            }
                          >
                            Remove
                          </a>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>{t("Amount before Tax")}:</span>
                      <span>${amountWithoutTax}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>{t("Total Units")}:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>{t("TAX")}:</span>
                      <span>${taxAmount}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>{t("Total price")}:</span>
                      <span>${totalAmount}</span>
                    </li>
                  </ul>

                  <a
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-black border border-transparent rounded-md cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    {t("Continue")}
                  </a>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-black bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    {t("Back to shop")}
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
