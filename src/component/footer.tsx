import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="Gramer Ghee"
                className="w-30 h-30 bg-amber-50 rounded-full"
              />
              <span className="text-2xl font-bold">Gramer Ghee</span>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Bringing you the purest cow milk ghee from our village to your
              kitchen. Taste the tradition, feel the purity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1CYXG1pTwN/"
                target="_blank"
                className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="material-icons">facebook</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="material-icons">call</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <span className="material-icons">email</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-green-100">Adaray Ghee</span>
              </li>
              <li>
                <span className="text-green-100">Pure Cow Milk Ghee</span>
              </li>
              <li>
                <span className="text-green-100">Traditional Ghee</span>
              </li>
              <li>
                <span className="text-green-100">Organic Ghee</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-100">
            © 2025 Gramer Ghee. All rights reserved. | Made with ❤️ in
            Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
