import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div>Error occured...</div>
      <p className="">Error code</p>
      <p className="">404</p>
      <NavLink to="/">Home</NavLink>
    </>
  );
};

export default Error;
