import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AddInventory = () => {
  const { auth } = useAuth();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/inventory/add",
        { user_id: auth.user.user_id, product_id: productId, quantity: parseFloat(quantity) },
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      setSuccess("Inventory updated successfully!");
      setError(null);
    } catch (err) {
      console.error("Error adding to inventory:", err);
      setError("Failed to add to inventory.");
      setSuccess(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add to Inventory</h1>
      <form onSubmit={handleAddInventory} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Inventory
        </button>
      </form>
      {success && <p className="text-green-600 mt-4">{success}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default AddInventory;
