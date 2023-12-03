import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Provider from "../context/AuthContext";
import Navbar from "@/components/Navbar";
import ToastComponent from "@/components/ToastComponent";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Mathly: A-Level Math",
  description: "A-Level Math at your fingertips! Learn H1,H2,H3 Mathematics on Mathly with other students!",
  icons: {
    icon: "/mathly.svg",
    apple: "/mathly.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden overflow-y-hidden">
      <body className={`${poppins.className} h-screen w-screen overflow-y-auto`}>
        <ToastComponent />
        <Provider>
          <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
