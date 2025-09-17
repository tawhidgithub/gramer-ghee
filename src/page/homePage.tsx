import { useEffect, useState } from "react";

import Navbar from "../component/navbar";
import HeroSection from "../component/heroSection";
import AboutSection from "../component/aboutSection";
import ProductsSection from "../component/productSection";
import ContactSection from "../component/contectSection";
import Footer from "../component/footer";
import Cart from "../component/cartSection";
import type { CartItem } from "../interface/cartType";
const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "products", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Cart Icon */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-green-700 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
        >
          <span className="material-icons ">Cart</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {cartItemCount}
          </span>
        </button>
      )}

      <HeroSection />
      <AboutSection />
      <ProductsSection cart={cart} setCart={setCart} />
      <ContactSection />
      <Footer />

      <Cart
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
    </div>
  );
};
export default HomePage;
