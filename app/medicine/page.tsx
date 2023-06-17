import { Sidebar } from "../components/__index";
import Medicine from "./Medicine";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Medicine />
    </>
  );
}
