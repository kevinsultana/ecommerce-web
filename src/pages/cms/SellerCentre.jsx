import React, { useState } from "react";
import {
  FaBoxOpen,
  FaChartBar,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";

export default function SellerCentre() {
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataCard = [
    {
      label: "Total Produk",
      value: 100,
      icon: <FaBoxOpen className="w-6 h-6" />,
    },
    {
      label: "Total Item",
      value: 100,
      icon: <FaClipboardList className="w-6 h-6" />,
    },
    {
      label: "Total Harga Barang",
      // value: `Rp. ${totalModal.toLocaleString("id-ID")}`,
      value: 100,
      icon: <FaShoppingCart className="w-6 h-6" />,
    },
    {
      label: "Total Pesanan",
      value: 100,
      icon: <FaChartBar className="w-6 h-6" />,
    },
  ];
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard CMS
      </h1>

      {/* Card Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dataCard.map((item, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md flex flex-col items-center transition"
          >
            <div className="text-indigo-600 dark:text-indigo-400 mb-2">
              {item.icon}
            </div>
            <h2 className="text-sm text-gray-600 dark:text-gray-300">
              {item.label}
            </h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filter  */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 space-y-3 capitalize"
        >
          <option value="all">All Categories</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option
                className="capitalize"
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))
          ) : (
            <option value="all">All Categories</option>
          )}
        </select>
      </div>

      {/* Table Item */}
      <div className="overflow-x-auto mt-6 rounded-xl border border-black bg-white dark:bg-gray-800">
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300 uppercase">
            <tr>
              <th className="px-3 py-2 sm:px-6 sm:py-3">No</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Image</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Name</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 hidden sm:table-cell">
                Category
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Price</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Stock</th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  {loading ? "Memuat produk..." : "Tidak ada produk ditemukan."}
                </td>
              </tr>
            ) : (
              filteredProducts.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-white"
                >
                  <td className="px-3 py-2 border-r sm:px-6 sm:py-3">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 border-r sm:px-6 sm:py-3">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md sm:w-24 sm:h-24"
                    />
                  </td>
                  <td className="px-3 py-2 border-r capitalize sm:px-6 sm:py-3">
                    {item.name}
                  </td>
                  <td className="px-3 py-2 border-r capitalize hidden sm:table-cell sm:px-6 sm:py-3">
                    {item.category}
                  </td>
                  <td className="px-3 py-2 border-r sm:px-6 sm:py-3">
                    Rp {item.price ? item.price.toLocaleString("id-ID") : "0"}
                  </td>
                  <td className="px-3 py-2 border-r sm:px-6 sm:py-3">
                    {item.stock}
                  </td>
                  <td className="px-3 py-2 space-x-1 sm:px-6 sm:py-3 sm:space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
