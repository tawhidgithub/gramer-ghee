import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import jarImage from "../assets/productv2.png";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import logo from "../assets/logo.png";

import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookMessenger,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CustomerInfo = {
  phone: string;
  name: string;
  address: string;
  district: string;
  email: string;
};

const OrderPage = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: "Premium Ghee 100ml", price: 180, image: jarImage },
    { id: 2, name: "Premium Ghee 250ml", price: 450, image: jarImage },
    { id: 3, name: "Organic Ghee 500ml", price: 810, image: jarImage },
  ]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    phone: "",
    name: "",
    address: "",
    district: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingCost, setShippingCost] = useState<number>(0);

  const [isCustom, setIsCustom] = useState("constantJur");
  const [sliderValue, setSliderValue] = useState(100); // default end value

  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  useEffect(() => {
    console.log("Shipping cose :", shippingCost);
  }, [shippingCost]);

  useEffect(() => {
    if (isCustom === "constantJur") {
      // reset slider
      setSliderValue(100);

      // keep product quantities as they are, OR reset if you want:
      setQuantities((prev) =>
        Object.fromEntries(Object.keys(prev).map((id) => [Number(id), 0]))
      );
    } else {
      // custom selected → reset product quantities
      setQuantities((prev) =>
        Object.fromEntries(Object.keys(prev).map((id) => [Number(id), 0]))
      );
    }
  }, [isCustom]);

  const priceParGram = 1800 / 1000;

  const getSliderPrice = () => {
    if (isCustom === "custom" && sliderValue > 0) {
      return sliderValue * priceParGram;
    }
    return 0;
  };

  useEffect(() => {
    if (customerInfo.district === "Dhaka") {
      setShippingCost(70);
    } else {
      setShippingCost(130);
    }
  }, [customerInfo.district]);

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, prev[productId] + change),
    }));
  };

  const districts = [
    "Dhaka",
    "Mymensingh",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
  ];

  const getTotalPrice = () => {
    const productTotal = products.reduce((total, product) => {
      return total + product.price * quantities[product.id];
    }, 0);

    return productTotal + getSliderPrice() + shippingCost; // 👈 add slider price
  };

  const getOrderedItems = () => {
    const ordered = products.filter((product) => quantities[product.id] > 0);

    if (isCustom === "custom" && sliderValue > 0) {
      ordered.push({
        id: 999,
        name: `${sliderValue} gm Custom Ghee`,
        price: getSliderPrice(), // this is only for display
        image: jarImage,
      });
    }

    return ordered;
  };

  const handleInputChange = <K extends keyof CustomerInfo>(
    field: K,
    value: CustomerInfo[K]
  ) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (
      !customerInfo.phone.trim() ||
      !customerInfo.name.trim() ||
      !customerInfo.address.trim() ||
      !customerInfo.email.trim() ||
      !customerInfo.district.trim()
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    // build items
    const orderedItems = getOrderedItems().map((item) => ({
      name: item.name,
      units: quantities[item.id] ?? 1,
      price: (item.price * (quantities[item.id] ?? 1)).toFixed(2),
    }));

    const orderDetails = {
      order_id: orderNumber,
      orders: orderedItems, // array → EmailJS can loop with {{#orders}}
      shippingCost: shippingCost,
      costTotal: getTotalPrice().toFixed(2),
      email: customerInfo.email, // optional if you want
      clientName: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      district: customerInfo.district,
    };

    console.log("🛒 Sending order:", orderDetails);

    emailjs
      .send(
        "service_jf38ajo", // ✅ Your EmailJS service ID
        "template_ltqfzku", // ✅ Your EmailJS template ID
        orderDetails,
        "hwIbonPNQhVHjfjRt" // ✅ Your public key
      )
      .then(
        () => {
          alert("✅ Order placed & email sent!");
        },
        (error: { text: string }) => {
          console.error("❌ FAILED...", error.text);
        }
      );
  };

  const handelInputValue = (val: number[]) => {
    const endValur = Math.max(100, val[1]);
    setSliderValue(endValur);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-4 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 flex justify-center text-white py-6 px-6">
          <div className="flex items-center space-x-3 mb-0">
            <img
              src={logo}
              alt="Gramer Ghee"
              className="w-30 h-30 bg-amber-50 rounded-full"
            />
            <span className="text-2xl font-bold">Gramer Ghee</span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Phone Section */}

          <div className="grid gap-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="constantJur"
                name="constantJur"
                value="constantJur"
                checked={isCustom === "constantJur"}
                onChange={(e) => setIsCustom(e.target.value)}
                className="w-5 h-5 text-green-600"
              />
              <label
                htmlFor="cod"
                className="text-lg font-medium text-gray-700"
              >
                Readymade
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="custom"
                name="custom"
                value="custom"
                checked={isCustom === "custom"}
                onChange={(e) => setIsCustom(e.target.value)}
                className="w-5 h-5 text-green-600"
              />
              <label
                htmlFor="stripe"
                className="text-lg font-medium text-gray-700"
              >
                Custom
              </label>
            </div>
          </div>
          {/* Products Section */}
          <div className="space-y-6">
            <Label className="text-2xl md:text-3xl font-bold text-green-800 block">
              🛒 Products
            </Label>
            {isCustom === "constantJur" ? (
              <div className="grid gap-4 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-green-50 rounded-xl p-4 md:p-6 border border-green-200"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="size-30">
                          <img src={product.image} className="object-contain" />
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                            {product.name}
                          </h3>
                          <p className="text-green-600 font-bold text-lg">
                            ৳{product.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => updateQuantity(product.id, -1)}
                          disabled={quantities[product.id] <= 0}
                          variant="outline"
                          size="sm"
                          className="h-10 w-10 rounded-full border-green-300 hover:bg-green-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="text-xl font-bold text-gray-800 w-8 text-center">
                          {quantities[product.id]}
                        </span>

                        <Button
                          onClick={() => updateQuantity(product.id, 1)}
                          variant="outline"
                          size="sm"
                          className="h-10 w-10 rounded-full border-green-300 hover:bg-green-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {quantities[product.id] > 0 && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-right text-lg font-semibold text-green-700">
                          Subtotal: ৳
                          {(
                            product.price * quantities[product.id]
                          ).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <RangeSlider
                  id="sliderFilter"
                  value={[0, sliderValue]}
                  min={0}
                  max={1000}
                  defaultValue={[0, 100]}
                  onInput={handelInputValue}
                />
                <p className="mt-6 text-black-600">
                  Selected Range:
                  <span className="text-green-600 font-bold">
                    {" "}
                    0-{sliderValue}
                  </span>
                  <span>gm</span>
                </p>
              </div>
            )}
          </div>

          {/* Delivery Section */}
          <div className="space-y-6">
            <Label className="text-2xl md:text-3xl font-bold text-green-800 block">
              🚚 Delivery
            </Label>

            <div className="grid gap-4 md:gap-6">
              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="h-12 md:h-14 text-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your  email"
                  className="h-12 md:h-14 text-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl"
                />
              </div>
              <div className="space-y-2 w-full">
                <Label className="text-xl font-semibold text-gray-700">
                  District
                </Label>
                <select
                  id="district"
                  name="district"
                  value={customerInfo.district}
                  onChange={(e) =>
                    handleInputChange("district", e.target.value)
                  }
                  className="h-12 md:h-14 text-lg flex-1 border-2 border-gray-300 
               focus:border-green-500 focus:ring-2 focus:ring-green-200 
               rounded-xl px-3"
                >
                  <option value="">Select your district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-xl font-semibold text-gray-700">
                  Full Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your complete delivery address"
                  className="h-12 md:h-14 text-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-xl font-semibold text-gray-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+8801XXX-XXXXXX"
                  className="h-12 md:h-14 text-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <Label className="text-2xl md:text-3xl font-bold text-green-800 block">
              💳 Payment
            </Label>
            <div className="grid gap-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-green-600"
                />
                <label
                  htmlFor="cod"
                  className="text-lg font-medium text-gray-700"
                >
                  💰 Cash on Delivery
                </label>
              </div>
              {/* <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="stripe"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-green-600"
                />
                <label
                  htmlFor="stripe"
                  className="text-lg font-medium text-gray-700"
                >
                  💳 Stripe Payment
                </label>
              </div> */}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Label className="text-2xl md:text-3xl font-bold text-green-800 block">
              📋 Order Summary
            </Label>

            <div className="bg-green-50 rounded-xl p-4 md:p-6 border border-green-200">
              {getOrderedItems().length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {getOrderedItems().map((product) => {
                      const qty = quantities[product.id] ?? 1; // default to 1 if not in quantities
                      return (
                        <>
                          <div
                            key={product.id}
                            className="flex justify-between items-center"
                          >
                            <span className="text-gray-700">
                              {product.name} × {qty}
                            </span>
                            <span className="font-semibold text-gray-800">
                              ৳{(product.price * qty).toLocaleString()}
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <div className="border-t border-green-200 pt-3 ">
                    <div
                      key={2}
                      className="flex justify-between items-center mb-5"
                    >
                      <span className="text-gray-700">
                        {customerInfo.district}
                      </span>
                      <span className="font-semibold text-gray-800">
                        ৳{customerInfo.district === "Dhaka" ? 70 : 130}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-green-800">Total:</span>
                      <span className="text-green-800">
                        ৳{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 h-12 md:h-14 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                  >
                    Place Order - ৳{getTotalPrice().toLocaleString()}
                  </Button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-xl">No items selected</p>
                  <p className="text-sm">Please select products to continue</p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() =>
                  window.open("https://wa.me/8801963151179", "_blank")
                }
                className="flex-1 mt-6 h-12 md:h-14 text-lg bg-transparent hover:bg-green-700 hover:text-white text-green-700 border-2 border-green-600 rounded-xl font-semibold"
              >
                {"Chat with us in => "} <FontAwesomeIcon icon={faWhatsapp} />
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/share/1CYXG1pTwN/",
                    "_blank"
                  )
                }
                className="flex-1 mt-6 h-12 md:h-14 text-lg bg-transparent hover:bg-blue-700 text-blue-400 border-2 hover:text-white border-blue-400 rounded-xl font-semibold"
              >
                {"Chat with us in =>"}{" "}
                <FontAwesomeIcon icon={faFacebookMessenger} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
