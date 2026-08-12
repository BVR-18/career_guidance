import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background flex">
      <Sidebar />
      <main className="flex-grow md:ml-64 px-margin-mobile md:px-unit-xl py-unit-lg pb-24 md:pb-unit-lg max-w-[1400px] w-full mx-auto">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}
