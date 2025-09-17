import type { FC } from "react";
import type { ProductsSectionProps } from "../interface/cartType";
import img from "../assets/productv2.png";
import { useNavigate } from "react-router";

const ProductsSection: FC<ProductsSectionProps> = () => {
  const navigate = useNavigate();
  const product = [
    {
      id: 1,
      name: "Adaray Ghee",
      price: 180,
      originalPrice: 200,
      size: "100g",
      discount: "0%",
      image: img,
      saveTaka: 20,

      description:
        "Premium pure cow milk ghee made with traditional methods. Rich, aromatic, and perfect for all your cooking needs.",
      features: [
        "100% Pure Cow Milk",
        "No Preservatives",
        "Traditional Method",
        "Village Fresh",
      ],
    },
    {
      id: 2,
      name: "Adaray Ghee",
      price: 360,
      originalPrice: 380,
      size: "200g",
      discount: "0%",

      saveTaka: 20,
      image: img,
      description:
        "Premium pure cow milk ghee made with traditional methods. Rich, aromatic, and perfect for all your cooking needs.",
      features: [
        "100% Pure Cow Milk",
        "No Preservatives",
        "Traditional Method",
        "Village Fresh",
      ],
    },
    {
      id: 3,
      name: "Adaray Ghee",
      price: 810,
      originalPrice: 900,
      size: "500g",
      image: img,
      saveTaka: 90,
      discount: "5%",

      description:
        "Premium pure cow milk ghee made with traditional methods. Rich, aromatic, and perfect for all your cooking needs.",
      features: [
        "100% Pure Cow Milk",
        "No Preservatives",
        "Traditional Method",
        "Village Fresh",
      ],
    },
  ];

  const handelOrder = (item: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    size: string;
    discount: string;
    image: string;
    saveTaka: number;
    description: string;
    features: string[];
  }) => {
    navigate("/order-page", {
      state: {
        item: item,
      },
    });
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600">
            Discover our premium range of pure ghee products
          </p>
        </div>
        <div className="flex flex-col gap-9 sm:flex-row flex-wrap justify-center">
          {product.map((item, index) => {
            return (
              <div className="flex justify-center" key={index}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover max-w-md">
                  <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-4 rounded-2xl shadow-lg">
                    <div className="absolute top-3 right-3 bg-red-500 text-white  text-sm font-bold py-1 px-3 rounded-full shadow-md">
                      {item.discount}
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full max-h-96 object-contain relative rounded-2xl"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {item.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="material-icons text-green-600 text-sm">
                            check
                          </span>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-green-700">
                          ৳{item.price}
                        </span>
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ৳{item.originalPrice}
                        </span>
                        <div className="text-sm text-gray-600">{item.size}</div>
                      </div>
                      <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Save ৳{item.saveTaka}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handelOrder(item);
                      }}
                      className="w-full ghee-gradient text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Order now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;
