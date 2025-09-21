import { createRoot } from "react-dom/client";
import "./global.css";
import { HashRouter, Route, Routes } from "react-router";
import HomePage from "./page/homePage.tsx";
import OrderPage from "./page/orderPage.tsx";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order-page" element={<OrderPage />} />
    </Routes>
  </HashRouter>
);
