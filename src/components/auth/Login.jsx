"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/helpers";
import { useLocale } from "@/context/LocaleContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await signIn("credentials", {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/",
      redirect: false,
    });

    setLoading(false);
    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push("/");
    }
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">{t("Login")}</h2>

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
          {loading ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            t("Login")
          )}
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5 text-gray-600">
          {t("Don't have an account?")}{" "}
          <Link href="/register" className="text-black font-bold">
            {t("Register")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
