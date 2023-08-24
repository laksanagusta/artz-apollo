import React from "react";
import Transaction from "./Transaction";
import { Sidebar } from "../components";

const page = () => {
  return (
    <>
      <Sidebar />
      <Transaction />
    </>
  );
};

export default page;
