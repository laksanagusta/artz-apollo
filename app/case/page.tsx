import { Sidebar } from "../components/__index";
import Case from "./Case";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Case />
    </>
  );
}
