import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="hero-gradient min-h-screen flex w-full items-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Pure Goodness from the
                <span className="text-green-700"> Village</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-green-600 font-semibold">
                Gramer Ghee
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Experience the authentic taste of pure cow milk ghee, crafted with
              traditional methods in our village. Rich in nutrients and bursting
              with natural flavor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  navigate("/order-page");
                }}
                className="ghee-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Order Now
              </button>
              <button className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">100%</div>
                <div className="text-sm text-gray-600">Pure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">Fresh</div>
                <div className="text-sm text-gray-600">Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">Natural</div>
                <div className="text-sm text-gray-600">Process</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative floating-animation">
              <div className="w-80 h-80 rounded-full ghee-gradient p-8 shadow-2xl">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <span className="material-icons text-6xl text-yellow-600">
                        agriculture
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800">
                      Gramer Ghee
                    </h3>
                    <p className="text-green-600">Premium Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
