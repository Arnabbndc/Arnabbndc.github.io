import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProductModal = ({ userId, onClose, refreshProducts }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToInventory = async () => {
    try {
      await axios.post(
        "http://localhost:5000/inventory/add",
        {
          user_id: userId,
          product_id: selectedProduct,
          quantity: parseFloat(quantity),
        }
      );
      setSuccess("Product added to inventory successfully!");
      setError(null);
      setTimeout(() => {
        refreshProducts(); // Refresh product list
        onClose(); // Close the modal
      }, 1500);
    } catch (err) {
      console.error("Error adding to inventory:", err);
      setError("Failed to add product to inventory.");
      setSuccess(null);
    }
  };
  

  return (
<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-black dark:text-white">
    <h2 className="text-2xl font-bold mb-4">Add Product to Inventory</h2>
    <div>
      <label className="block text-gray-700 dark:text-gray-300">Select Product</label>
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-black dark:text-white bg-white dark:bg-gray-800"
      >
        <option value="">-- Select a Product --</option>
        {products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mt-4">
      <label className="block text-gray-700 dark:text-gray-300">Quantity</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-black dark:text-white bg-white dark:bg-gray-800"
      />
    </div>
    <div className="mt-4 flex justify-end space-x-4">
      <button
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
      >
        Cancel
      </button>
      <button
        onClick={handleAddToInventory}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Add
      </button>
    </div>
    {success && <p className="text-green-600 mt-4">{success}</p>}
    {error && <p className="text-red-600 mt-4">{error}</p>}
  </div>
</div>

  );
};

export default AddProductModal;
