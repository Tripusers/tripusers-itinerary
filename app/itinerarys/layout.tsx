import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { SuccessPopUpProvider } from "@/providers/SuccessPop";

import { ErrorBoundary } from "react-error-boundary";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <SuccessPopUpProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SuccessPopUpProvider>
    </ErrorBoundary>
  );
}
