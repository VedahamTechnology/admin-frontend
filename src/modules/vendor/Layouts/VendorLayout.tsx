import type { ReactNode } from "react";
import VendorSidebar from "../Components/VendorSidebar";
import VendorNavbar from "../Components/VendorNavbar";
import "../styles/vendor.css";

interface Props {
  children: ReactNode;
}

export default function VendorLayout({ children }: Props) {
  return (
    <div className="vendor-layout">
      <VendorSidebar />

      <div className="vendor-layout__content">
        <VendorNavbar />

        <main className="vendor-layout__main">
          {children}
        </main>
      </div>
    </div>
  );
}