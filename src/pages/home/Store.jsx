import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router";

export default function Store() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const querySnap = await getDocs(collection(db, "categories"));
      const categories = querySnap.docs.map((doc) => doc.data());
      setCategories(categories);
    } catch (error) {
      console.error("Gagal mengambil data kategori:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getDocs(collection(db, "products"));
      let products = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (selectedCategory) {
        products = products.filter(
          (product) => product.category === selectedCategory
        );
      }

      if (searchQuery) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (sort) {
        products.sort((a, b) => {
          if (sort === "price-asc") {
            return a.price - b.price;
          } else if (sort === "price-desc") {
            return b.price - a.price;
          } else if (sort === "stock-asc") {
            return a.stock - b.stock;
          } else if (sort === "stock-desc") {
            return b.stock - a.stock;
          } else if (sort === "name-asc") {
            return a.name.localeCompare(b.name);
          } else if (sort === "name-desc") {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
      }

      setData(products);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedCategory, sort, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Product Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`w-full text-left rounded-md h-auto px-4 py-2 text-black dark:text-white transition-colors cursor-pointer 
                  ${
                    selectedCategory === ""
                      ? "bg-blue-300 dark:bg-blue-600"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`w-full text-left rounded-md h-auto px-4 py-2 text-black dark:text-white transition-colors cursor-pointer 
                    ${
                      selectedCategory === category.value
                        ? "bg-blue-300 dark:bg-blue-600"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
              {selectedCategory
                ? categories.find((c) => c.value === selectedCategory)?.name
                : "All Categories"}
            </h2>

            <div className="flex flex-col sm:flex-row items-end gap-4">
              {/* Input Search */}
              <input
                type="text"
                placeholder="Cari Produk..."
                className="px-4 py-2 border rounded-md text-sm text-black bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              {/*  Sortir */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border rounded-md text-sm text-black bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition capitalize"
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price : Low to High</option>
                <option value="price-desc">Price : High to Low</option>
                <option value="stock-asc">Stock : Low to High</option>
                <option value="stock-desc">Stock : High to Low</option>
                <option value="name-asc">Name : A to Z</option>
                <option value="name-desc">Name : Z to A</option>
              </select>
            </div>
          </div>

          {/* Kondisi Loading */}
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                Loading produk...
              </p>
            </div>
          ) : (
            <>
              {data.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">
                    Tidak ada produk ditemukan.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transform transition-all hover:shadow-lg hover:scale-105 duration-200 cursor-pointer"
                    >
                      <div className="w-full h-60 bg-ibox-bg dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                        <img
                          src={
                            product.imgUrl ||
                            "https://placehold.co/400x400/EAEAEA/555?text=Product"
                          }
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {product.name.slice(0, 40)}
                        </h4>
                        <p className="text-sm text-blue-500 dark:text-blue-400 mt-1">
                          Rp {product.price?.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
