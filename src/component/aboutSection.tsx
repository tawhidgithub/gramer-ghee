const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Gramer Ghee
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where tradition meets purity in every golden drop
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-800">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              Gramer Ghee was born from a passion to bring you the purest, most
              authentic ghee straight from our village. Our journey began with a
              simple belief: that the best things in life come from nature,
              crafted with care and respect for tradition.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every jar of our Adaray Ghee is made from the milk of happy,
              grass-fed cows using time-honored methods passed down through
              generations. We combine traditional wisdom with modern quality
              standards to ensure you get nothing but pure goodness.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <span className="material-icons text-3xl text-green-700 mb-2">
                  eco
                </span>
                <h4 className="font-semibold text-green-800">100% Natural</h4>
                <p className="text-sm text-gray-600">
                  No additives or preservatives
                </p>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <span className="material-icons text-3xl text-yellow-700 mb-2">
                  verified
                </span>
                <h4 className="font-semibold text-yellow-800">
                  Quality Assured
                </h4>
                <p className="text-sm text-gray-600">
                  Tested for purity and taste
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-100 to-yellow-100 p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-green-800 mb-4">
                Why Choose Gramer Ghee?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    Made from pure cow milk from village farms
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    Traditional churning methods for authentic taste
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    Rich in vitamins A, D, E, and K
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    Perfect for cooking and health benefits
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">Home Made </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
