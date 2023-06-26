import { Sidebar } from "../components/__index";
import Symptom from "./Symptom";
import Case from "./Symptom";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Symptom />
    </>
  );
}
