import { Sidebar } from "../components";
import Symptom from "./Symptom";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Symptom />
    </>
  );
}
