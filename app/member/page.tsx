import { Sidebar } from "../components";
import Member from "./Member";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Member />
    </>
  );
}
