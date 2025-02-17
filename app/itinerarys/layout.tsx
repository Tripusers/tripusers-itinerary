import Header from "@/components/header/Header";
import { ToastProvider } from "@/context/toastContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider>
        <Header />
        <main>{children}</main>
      </ToastProvider>
    </>
  );
}
