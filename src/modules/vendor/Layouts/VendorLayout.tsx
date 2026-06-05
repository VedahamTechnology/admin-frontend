import type { ReactNode } from "react";
import VendorSidebar from "../Components/VendorSidebar";
import VendorNavbar from "../Components/VendorNavbar";

interface Props {
  children: ReactNode;
}

export default function VendorLayout({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <VendorSidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          marginLeft: "300px",
        }}
      >
        <VendorNavbar />

        <main
          style={{
            flex: 1,
            padding: "24px",
            overflowX: "hidden",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}