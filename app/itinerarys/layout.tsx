import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { SuccessPopUpProvider } from "@/providers/SuccessPop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SuccessPopUpProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SuccessPopUpProvider>
    </>
  );
}
