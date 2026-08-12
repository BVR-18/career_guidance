import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />
      <main className="flex-grow flex flex-col hero-gradient">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
