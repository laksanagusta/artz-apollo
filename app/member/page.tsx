import { Sidebar } from "../components/__index";
import Member from "./Member";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Member />
    </>
  );
}
