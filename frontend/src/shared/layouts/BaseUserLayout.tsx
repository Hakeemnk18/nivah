import "../style/theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type BaseUserLayoutProps = {
  children: React.ReactNode;
  mode?: "landing" | "default";
};

export function BaseUserLayout({ children, mode = "default" }: BaseUserLayoutProps) {
  return (
    <div className="user-theme min-h-screen flex flex-col">
      <Navbar mode={mode} />
      {children}
      <Footer />
    </div>
  );
}
