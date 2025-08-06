import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import formatRupiah from "../../utils/FormatRupiah";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const querySnap = await getDocs(collection(db, "products"));
      const products = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300">
      {/* Hero Section */}
      {/* <section className="text-center bg-indigo-50 dark:bg-gray-900 rounded-2xl p-10 mb-10 shadow">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Selamat Datang di Toko Kami!
        </h1>
        <p className="text-lg mb-6">
          Temukan berbagai produk menarik dengan harga terbaik. Selamat
          berbelanja!
        </p>
        <button
          onClick={() => {
            document
              .getElementById("produk-unggulan")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Lihat Produk
        </button>
      </section> */}
      <section className="bg-black pb-6">
        <img
          src="/heroImg/heroImgWeb.png"
          alt="heroimg"
          className="w-2/4 h-full object-cover mx-auto"
        />
        <div className="max-w-1/2 mx-auto flex flex-col items-center space-y-6">
          <h1 className="text-white text-center  text-2xl">
            Introducing iPhone 16 Pro and iPhone 16, built for Apple
            Intelligence. All-new Apple Watch Series 10 and AirPods 4. Apple
            Watch Ultra 2 and AirPods Max in fresh new colors. And AirPods Pro
            2, with hearing health features coming this fall.
          </h1>
          <button
            onClick={() =>
              window.open("https://www.youtube.com/watch?v=uarNiSl_uh4&t=2393s")
            }
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            <p>Watch the event</p>
          </button>
        </div>
      </section>

      <section className="bg-black pb-6 bg-[url('/heroImg/iphone16Pro.png')] h-full bg-cover">
        <div className="pt-60 max-w-1/2 mx-auto flex flex-col items-center space-y-6">
          <h1 className="text-white text-center text-6xl ">Iphone 16 Pro</h1>
          <div className="pt-120" />
          <p className="text-white text-center text-xl ">
            Built for Apple Intelligence — personal, private, powerful. Camera
            Control, an easier way to quickly access camera tools. Stunning 4K
            120 fps Dolby Vision video. A18 Pro chip. And a huge leap in battery
            life.
          </p>
          <div className="py-4">
            <p className="text-white text-center text-base ">
              Pre-order starting 9.13 Available starting 9.20
            </p>
            <p className="text-white text-center text-base ">
              Apple Intelligence coming this fall
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => navigate("/iphone")}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Learn More
          </button>
          <button
            onClick={() => navigate("/store")}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Pricing
          </button>
        </div>
      </section>

      <section className="pb-6 bg-[url('/heroImg/iphone16.png')] h-full bg-cover">
        <div className="pt-30 max-w-1/2 mx-auto flex flex-col items-center space-y-6">
          <h1 className="text-white text-center text-6xl ">Iphone 16</h1>
          <div className="pt-120" />
          <p className="text-white text-center text-xl ">
            Built for Apple Intelligence to help you write, express yourself,
            and get things done effortlessly. Camera Control, an easier way to
            quickly access camera tools. And the custom-built A18 chip.
          </p>
          <div className="py-4">
            <p className="text-white text-center text-base ">
              Pre-order starting 9.13 Available starting 9.20
            </p>
            <p className="text-white text-center text-base ">
              Apple Intelligence coming this fall
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => navigate("/iphone")}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Learn More
          </button>
          <button
            onClick={() => navigate("/store")}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Pricing
          </button>
        </div>
      </section>

      <section className="pb-6 bg-[url('/heroImg/mac.png')] h-screen bg-cover">
        <div className="pt-20 max-w-1/2 mx-auto flex flex-col items-center space-y-6">
          <h1 className="text-black text-center text-6xl">Macbook Air</h1>
          <p className="text-black text-center text-base ">
            Sky blue color. Sky high performance with M4.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => navigate("/macbook")}
              className="px-6 py-3 rounded-full border border-black text-black font-semibold hover:bg-sky-300 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Learn More
            </button>
            <button
              onClick={() => navigate("/store")}
              className="px-6 py-3 rounded-full border border-black text-black font-semibold hover:bg-sky-300 hover:text-white transition-all duration-300 cursor-pointer"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <section className="pb-6 bg-[url('/heroImg/iwatch.png')] h-250 bg-center">
        <div className="pt-60 max-w-1/2 mx-auto flex flex-col items-center space-y-6">
          <p className="text-black text-center text-xl ">
            Our thinnest watch with our biggest display.Invaluable health
            insights, including sleep apnea notifications. Tracking for your
            activity and workouts — with depth and water temperature. All in our
            fastest-charging watch ever.
          </p>
          <div className="py-4">
            <p className="text-black text-center text-base ">
              Available starting 9.20
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => navigate("/iwatch")}
            className="px-6 py-3 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            Learn More
          </button>
          <button
            onClick={() => navigate("/store")}
            className="px-6 py-3 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            View Pricing
          </button>
        </div>
      </section>

      <section className="pb-6 bg-[url('/heroImg/airpods.png')] h-250 bg-cover">
        <div className="pt-120 max-w-1/3 mx-auto flex flex-col items-center space-y-6">
          <h1 className="text-white text-center text-6xl ">AirPods 4</h1>
          <p className="text-white text-center text-xl ">
            Updated fit for all-day comfort. A totally transformed audio
            experience. And available with Active Noise Cancellation — a first
            for this open-ear design.
          </p>
          <div className="py-4">
            <p className="text-white text-center text-base ">
              Available starting 9.20
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => navigate("/airpods")}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Learn More
          </button>
          <button
            onClick={() => navigate("/store")}
            className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Pricing
          </button>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section id="produk-unggulan">
        <h2 className="text-3xl font-bold mb-6 text-center">Produk Unggulan</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Belum ada produk tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-full h-48 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-md font-semibold truncate">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                      {formatRupiah(item.price)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Terjual: {item.sold ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
