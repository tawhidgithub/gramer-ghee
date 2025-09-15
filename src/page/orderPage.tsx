import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
};

const OrderPage = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: "Premium Ghee 500ml", price: 800, image: "🥛" },
    { id: 2, name: "Premium Ghee 1L", price: 1500, image: "🥛" },
    { id: 3, name: "Organic Ghee 500ml", price: 1200, image: "🥛" },
  ]);

  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    phone: "",
    name: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, prev[productId] + change),
    }));
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.price * quantities[product.id];
    }, 0);
  };

  const getOrderedItems = () => {
    return products.filter((product) => quantities[product.id] > 0);
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
    const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const orderDetails = {
      orderNumber,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customAddress: customerInfo.address,
      paymentMethod,
      items: getOrderedItems()
        .map(
          (product) =>
            `${product.name} × ${quantities[product.id]} = ৳${
              product.price * quantities[product.id]
            }`
        )
        .join("\n"),
      total: `৳${getTotalPrice()}`,
    };

    console.log("Product Details:", orderDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-4 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white py-6 px-6">
          <div className="flex items-center justify-center gap-4">
            {/* Replace this div with your actual logo */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">
              GG
            </div>
            <span className="text-2xl md:text-3xl font-bold">Gramer Ghee</span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Phone Section */}
          <div className="space-y-4">
            <Label className="text-2xl md:text-3xl font-bold text-green-800 block">
              📱 Phone
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

          {/* Products Section */}
          <div className="space-y-6">
            <Label className="text-2xl md:text-3xl font-bold text-green-800 block">
              🛒 Products
            </Label>
            <div className="grid gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-green-50 rounded-xl p-4 md:p-6 border border-green-200"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">{product.image}</div>
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
                  Address
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
              <div className="flex items-center space-x-3">
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
              </div>
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
                    {getOrderedItems().map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700">
                          {product.name} × {quantities[product.id]}
                        </span>
                        <span className="font-semibold text-gray-800">
                          ৳
                          {(
                            product.price * quantities[product.id]
                          ).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-green-200 pt-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
