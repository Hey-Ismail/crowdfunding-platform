import { Navbar, Footer } from "@/components";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
