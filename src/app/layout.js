import "./globals.css";
import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";
import { AuthDebugger } from "@/components/auth/auth-check";
import { LocaleProvider } from "@/context/LocaleContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning={true}>
        <LocaleProvider>
          <GlobalProvider>
            <Header />
            {children}
            {/* <AuthDebugger /> */}
          </GlobalProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
