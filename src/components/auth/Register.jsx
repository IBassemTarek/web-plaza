"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useLocale } from "@/context/LocaleContext";

const Register = () => {
  const { error, registerUser, clearErrors } = useContext(AuthContext);
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, clearErrors]);

  const submitHandler = (e) => {
    e.preventDefault();

    registerUser({ name, email, password });
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">{t("Register Account")}</h2>

        <div className="mb-4">
          <label className="block mb-1"> {t("Full Name")} </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder={t("Type your name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> {t("Email")} </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder={t("Type your email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> {t("Password")} </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder={t("Type your password")}
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-black border border-transparent rounded-md"
        >
          {t("Register")}
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5 text-gray-600">
          {t("Already have an account?")}{" "}
          <Link href="/login" className="text-black font-bold">
            {t("Sign in")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
