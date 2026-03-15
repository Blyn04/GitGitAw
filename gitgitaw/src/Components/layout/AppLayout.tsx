import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* pt-12 offsets the fixed mobile top bar; removed on md+ */}
      <main id="main-scroll" className="flex-1 overflow-y-auto h-screen pt-12 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
