import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import CloudinaryUploadBtn from "../../components/CloudinaryUploadBtn";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function AddNewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
    stock: "",
  });
  const [categories, setCategories] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const querySnap = await getDocs(collection(db, "categories"));
      const categories = querySnap.docs.map((doc) => doc.data());
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      Swal.fire("Semua field wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const productsRef = collection(db, "products");
      await addDoc(productsRef, product);
      Swal.fire("Success adding product.");
      navigate("/seller");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Failed adding product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Swal.fire("Nama kategori tidak boleh kosong!");
      return;
    }

    setCategoryLoading(true);

    try {
      const categoriesRef = collection(db, "categories");
      const q = query(
        categoriesRef,
        where("name", "==", newCategoryName.trim().toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Swal.fire("Gagal", "Kategori sudah ada!", "error");
        return;
      }

      await addDoc(categoriesRef, {
        value: newCategoryName.trim().toLowerCase(),
        name: newCategoryName.trim(),
      });

      Swal.fire("Berhasil", "Kategori berhasil ditambahkan!", "success");
      setNewCategoryName("");
      setShowAddCategoryModal(false);
      getCategories();
    } catch (error) {
      console.error("Error adding category:", error);

      Swal.fire(
        "Gagal",
        `Terjadi kesalahan saat menambahkan kategori: ${error.message}`,
        "error"
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer text-gray-800 dark:text-white"
          />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add New Product
          </h1>
        </div>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Contoh: Headphone Wireless"
              className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Deskripsi
            </label>
            <textarea
              rows={4}
              placeholder="Deskripsi produk..."
              className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={product.description}
              onChange={handleChange}
              name="description"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kategori
            </label>
            <div className="flex gap-2">
              <select
                value={product.category}
                onChange={handleChange}
                name="category"
                className="mt-1 w-full px-4 py-2 capitalize border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              >
                <option value="">Pilih kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.value} className="capitalize">
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddCategoryModal(true)}
                className="mt-1 px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Harga (Rp)
              </label>
              <input
                type="number"
                className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
                placeholder="contoh: 150000"
                value={product.price}
                onChange={handleChange}
                name="price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stok
              </label>
              <input
                type="number"
                className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
                placeholder="contoh: 20"
                value={product.stock}
                onChange={handleChange}
                name="stock"
              />
            </div>
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gambar Produk
            </label>
            {product.imgUrl ? (
              <img
                src={product.imgUrl}
                alt="product"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover mb-3"
              />
            ) : (
              <p className="text-sm text-gray-500 mb-3">
                Belum ada gambar dipilih.
              </p>
            )}
            <CloudinaryUploadBtn
              setImgUrl={(i) => setProduct((prev) => ({ ...prev, imgUrl: i }))}
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-4 py-2 rounded-md border text-sm dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Add New Category
            </h2>
            <input
              type="text"
              placeholder="Category Name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="px-4 py-2 rounded-md border text-sm text-black dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                {categoryLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
