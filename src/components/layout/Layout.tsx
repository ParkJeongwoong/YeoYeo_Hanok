import { Outlet } from "react-router-dom";
import ScrollToTop from "@components/common/ScrollRestoration";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="page-wrap">
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default Layout;
