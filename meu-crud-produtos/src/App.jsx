import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./components/ProductForm";

export default function App() {
  return (
    <Router>
        <AppNavBar />
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-3">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/new" element={<ProductForm />} />
                    <Route path="/products/edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </div>
    </Router>
  );
}