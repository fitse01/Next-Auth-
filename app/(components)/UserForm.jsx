"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: POST,
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/3"
      >
        <h1>Create New User</h1>

        <lable>Full Name</lable>
        <input 
            id="name" 
            name="name" 
            type="text"
            onChange ={handleChange}
            required = {true}
            value={formData.name}
            className ="m-2 bg-slate-400 rounded"
        />
        <lable>email</lable>
        <input 
            id="email" 
            name="email" 
            type="email"
            onChange ={handleChange}
            required = {true}
            value={formData.email}
            className ="m-2 bg-slate-400 rounded"
        />
        <lable>Password</lable>
        <input 
            id="password" 
            name="password" 
            type ="password"
            onChange ={handleChange}
            required = {true}
            value={formData.password}
            className ="m-2 bg-slate-400 rounded"
        />
        <lable>USER nAME</lable>
        <input 
            id="password" 
            name="password" 
            type ="password"
            onChange ={handleChange}
            required = {true}
            value={formData.password}
            className ="m-2 bg-slate-400 rounded"
        />
        <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
      </form>
        
        <p className="text-red-400">{errorMessage}</p>
    </>
  );
};
export default UserForm;
