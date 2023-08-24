import { Sidebar } from "../components";
import Medicine from "./Medicine";

export default async function Home() {
  return (
    <>
      <Sidebar />
      <Medicine />
    </>
  );
}
