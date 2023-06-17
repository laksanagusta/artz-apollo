import React from "react";
import Transaction from "./Transaction";
import { Sidebar } from "../components/__index";

const page = () => {
  return (
    <>
      <Sidebar />
      <Transaction />
    </>
  );
};

export default page;
