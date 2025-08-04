import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaCheck,
  FaClipboardList,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
import { db } from "../../firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import formatRupiah from "../../utils/FormatRupiah";
import formatAngka from "../../utils/FormatAngka";
import { FaMoneyBill } from "react-icons/fa6";

export default function SellerCentre() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const totalProduct = filteredProducts?.length;
  const totalItem = filteredProducts.reduce(
    (total, product) => Number(total) + Number(product.stock || 0),
    0
  );
  const totalModal = filteredProducts.reduce(
    (total, product) => total + (product.price || 0) * (product.stock || 0),
    0
  );

  const dataCard = [
    {
      label: "Total Produk",
      value: formatAngka(totalProduct),
      icon: <FaBoxOpen className="w-6 h-6" />,
    },
    {
      label: "Total Item",
      value: formatAngka(Number(totalItem)),
      icon: <FaClipboardList className="w-6 h-6" />,
    },
    {
      label: "Total Harga Barang",
      value: formatRupiah(totalModal),
      icon: <FaMoneyBill className="w-6 h-6" />,
    },
    {
      label: "Pesanan Baru",
      value: orders.filter((order) => order.status === "pending").length,
      icon: <FaShoppingCart className="w-6 h-6" />,
      path: "order-list",
    },
    {
      label: "Pesanan Terkirim",
      value: orders.filter((order) => order.status === "terkirim").length,
      icon: <FaTruck className="w-6 h-6" />,
    },
    {
      label: "Pesanan Selesai",
      value: orders.filter((order) => order.status === "selesai").length,
      icon: <FaCheck className="w-6 h-6" />,
    },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    let q = collection(db, "products");

    if (filter) {
      q = query(q, where("category", "==", filter));
    }

    if (searchQuery) {
      const endKeyword = searchQuery + "\uf8ff";
      q = query(
        q,
        where("name", ">=", searchQuery),
        where("name", "<=", endKeyword)
      );
    }

    if (sort) {
      const [field, direction] = sort.split("-");
      q = query(q, orderBy(field, direction));
    }

    try {
      const querySnap = await getDocs(q);
      const products = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const querySnap = await getDocs(collection(db, "categories"));
      const categories = querySnap.docs.map((doc) => doc.data());
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getDocs(collection(db, "pesanan"));
      setOrders(res.docs.map((doc) => doc.data()));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    getCategories();
    fetchOrders();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(debounce);
  }, [filter, sort, searchQuery]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "products", id));
        Swal.fire("Dihapus!", "Produk Anda telah dihapus.", "success");
        fetchProducts();
      }
    });
  };

  const handleEdit = (id) => {
    navigate("edit-product/" + id, { replace: true });
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard CMS
      </h1>

      {/* Card Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dataCard.map((item, i) => (
          <div
            key={i}
            onClick={item.path ? () => navigate(item.path) : null}
            className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md flex flex-col items-center transition-all duration-300 ease-in-out ${
              item.path ? "cursor-pointer" : ""
            }`}
          >
            <div className="text-indigo-600 dark:text-indigo-400 mb-2">
              {item.icon}
            </div>
            <h2 className="text-sm text-gray-600 dark:text-gray-300">
              {item.label}
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-center gap-4 py-6">
        <div>
          <input
            type="text"
            placeholder="Cari Produk"
            className="px-4 py-2 border rounded text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 space-y-3 capitalize"
        >
          <option value="">All Categories</option>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <option key={index} value={category.value}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="">All Categories</option>
          )}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 space-y-3 capitalize"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price : Low to High</option>
          <option value="price-desc">Price : High to Low</option>
          <option value="stock-asc">Stock : Low to High</option>
          <option value="stock-desc">Stock : High to Low</option>
          <option value="name-asc">Name : A to Z</option>
          <option value="name-desc">Name : Z to A</option>
        </select>
        <button
          onClick={() => {
            setFilter("");
            setSort("");
            setSearchQuery("");
          }}
          className="btn bg-red-500 text-white"
        >
          Reset
        </button>
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
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  <div className="space-y-4">
                    <div className="loading loading-spinner loading-xl text-primary mx-auto"></div>
                    <p className="text-lg">Loading</p>
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  Tidak ada produk ditemukan.
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
                    {item.price ? formatRupiah(item.price) : "0"}
                  </td>
                  <td className="px-3 py-2 border-r sm:px-6 sm:py-3">
                    {item.stock ? formatAngka(item.stock) : "0"}
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
