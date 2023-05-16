"use client";

import AuthContext from "@/context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, error, loading, updateProfile, clearErrors } =
    useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    updateProfile({
      name,
      email,
    });
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

          <div className="mb-4">
            <label className="block mb-1"> Full Name </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-black border border-transparent rounded-md"
            disabled={loading ? true : false}
          >
            {loading ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
