import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import AddProductModal from "../components/AddProductModal"; // Import the modal component

const Products = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [editQuantity, setEditQuantity] = useState({});
  const [success, setSuccess] = useState(null);

  // Fetch existing inventory for the logged-in farmer
  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/inventory/${auth.user.user_id}`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Failed to load inventory.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [auth.user.user_id]);

  // Update quantity for existing products
  const handleEditQuantity = async (inventoryId) => {
    try {
      const newQuantity = parseFloat(editQuantity[inventoryId]);
      const currentProduct = products.find((p) => p.inventory_id === inventoryId);
    //   const deltaQuantity = newQuantity - currentProduct.quantity;

      await axios.post(
        "http://localhost:5000/inventory/add",
        {
          user_id: auth.user.user_id,
          product_id: currentProduct.product_id,
          quantity: newQuantity,
        }
      );

      setProducts((prev) =>
        prev.map((product) =>
          product.inventory_id === inventoryId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );
      setSuccess("Quantity updated successfully!");
      setTimeout(() => setSuccess(null), 2000); // Clear success message after 2 seconds
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchInventory(); // Refresh inventory after closing modal
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={handleOpenModal}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Product to Inventory
        </button>
      </div>

      {/* Modal for Adding Product */}
      {isModalOpen && (
        <AddProductModal
          userId={auth.user.user_id}
          onClose={handleCloseModal}
          refreshProducts={fetchInventory} // Refresh product list after adding
        />
      )}

      {success && <p className="text-green-600 mb-4">{success}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.inventory_id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {product.product_name}
              </h2>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {product.category}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Unit:</strong> {product.unit_of_measure}, <strong>Quantity:</strong>{" "}
              {product.quantity}
            </p>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={editQuantity[product.inventory_id] || ""}
                onChange={(e) =>
                  setEditQuantity({
                    ...editQuantity,
                    [product.inventory_id]: e.target.value,
                  })
                }
                placeholder="Update"
                className="border rounded-md px-2 py-1 text-gray-800"
              />
              <button
                onClick={() => handleEditQuantity(product.inventory_id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
              >
                Update
              </button>
            </div>
            <Link
              to={`/products/${product.product_id}`}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
