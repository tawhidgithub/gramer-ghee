import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setIsSubmitted(true);
    // setTimeout(() => setIsSubmitted(false), 3000);
    // setFormData({ name: "", email: "", message: "" });

    const phoneNumber = "8801940957526";
    const text = `Hello! My name is ${formData.name} , My email is ${formData.email}. Message : ${formData.message}`;

    const encodeText = encodeURIComponent(text);
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeText}`;
    window.open(waLink, "_blank");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center md:items-center sm:items-start sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">
            Get in touch with us for orders and inquiries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 justify-center md:grid-row sm:justify-start ">
          <div className="space-y-8 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Get in Touch
            </h3>

            <div className="space-y-6 text-center sm:text-left">
              <div className="flex items-start space-x-4">
                <div>
                  <h4 className="font-semibold text-gray-900 ">Address</h4>
                  <p className="text-gray-600 first-letter:uppercase">
                    Puspolane , west boxnagor sarulia demra <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-600">+8801963151179</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">gramerghee@gmail.com</p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-green-800 text-xl mb-3 flex items-center gap-2">
                <span className="material-icons text-green-600">Schedule</span>
                Business Hours
              </h4>

              <p className="text-gray-700 text-lg font-medium">
                🚀 Always Open Online!
              </p>
              <p className="text-gray-600 mt-1">
                Monday – Saturday: <span className="font-semibold">24 / 7</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Send us a Message
            </h3>

            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center space-x-2">
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full ghee-gradient text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
