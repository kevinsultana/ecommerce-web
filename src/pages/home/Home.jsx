import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDocs, collection } from "firebase/firestore";
import formatRupiah from "../../utils/FormatRupiah";
import { db } from "../../firebase/firebase";

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
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      {/* Hero Section 1: Event Intro */}
      <section className="bg-black py-8 md:py-16 px-4">
        <img
          src="/heroImg/heroImgWeb.png"
          alt="heroimg"
          className="w-full md:w-2/4 h-auto object-cover mx-auto mb-8"
        />
        <div className="max-w-screen-md mx-auto flex flex-col items-center text-center space-y-4 md:space-y-6">
          <h1 className="text-white text-xl md:text-2xl font-semibold">
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

      {/* Hero Section 2: iPhone 16 Pro */}
      <section className="relative h-full bg-[url('/heroImg/iphone16Pro.png')] bg-contain bg-no-repeat bg-center bg-black">
        <div className="relative z-10 flex flex-col items-center text-center text-white p-6 md:p-12 h-full gap-50 lg:gap-110">
          <h1 className="text-4xl mt-40 lg:mt-0 md:text-6xl font-bold mb-4 ">
            iPhone 16 Pro
          </h1>
          <div>
            <p className="text-base md:text-xl max-w-xl mb-4">
              Built for Apple Intelligence — personal, private, powerful. Camera
              Control, an easier way to quickly access camera tools. Stunning 4K
              120 fps Dolby Vision video. A18 Pro chip. And a huge leap in
              battery life.
            </p>
            <div className="text-sm md:text-base mb-6">
              <p>Pre-order starting 9.13 Available starting 9.20</p>
              <p>Apple Intelligence coming this fall</p>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-8">
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
          </div>
        </div>
      </section>

      {/* Hero Section 3: iPhone 16 */}
      <section className="relative h-screen bg-[url('/heroImg/iphone16.png')] bg-cover bg-center">
        <div className="relative z-10 flex flex-col items-center text-center text-black p-6 md:p-12 h-full justify-end gap-70 lg:gap-100">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            iPhone 16
          </h1>
          <div>
            <p className="text-base md:text-xl max-w-xl mb-4 text-white">
              Built for Apple Intelligence to help you write, express yourself,
              and get things done effortlessly. Camera Control, an easier way to
              quickly access camera tools. And the custom-built A18 chip.
            </p>
            <div className="text-sm md:text-base mb-6 text-white">
              <p>Pre-order starting 9.13 Available starting 9.20</p>
              <p>Apple Intelligence coming this fall</p>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={() => navigate("/iphone")}
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
          </div>
        </div>
      </section>

      {/* Hero Section 4: Macbook Air */}
      <section className="relative h-screen bg-[url('/heroImg/mac.png')] bg-cover bg-center">
        <div className="relative z-10 flex flex-col items-center text-center text-black p-6 md:p-12 h-full justify-start">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Macbook Air</h1>
          <p className="text-base md:text-xl max-w-xl mb-4">
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

      {/* Hero Section 5: iWatch */}
      <section className="relative h-screen bg-[url('/heroImg/iwatch.png')] bg-cover lg:bg-contain bg-center bg-no-repeat bg-white">
        <div className="relative z-10 flex flex-col items-center text-center text-black p-6 md:p-12 h-full pt-40 lg:pt-45">
          <p className="text-base md:text-xl max-w-xl mb-4">
            Our thinnest watch with our biggest display.Invaluable health
            insights, including sleep apnea notifications. Tracking for your
            activity and workouts — with depth and water temperature. All in our
            fastest-charging watch ever.
          </p>
          <div className="text-sm md:text-base mb-6">
            <p>Available starting 9.20</p>
          </div>
          <div className="flex items-center justify-center space-x-4 mb-8">
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
        </div>
      </section>

      {/* Hero Section 6: AirPods */}
      <section className="relative h-screen bg-[url('/heroImg/airpods.png')] bg-cover bg-center">
        <div className="relative z-10 flex flex-col items-center text-center text-white p-6 md:p-12 h-full justify-end">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">AirPods 4</h1>
          <p className="text-base md:text-xl max-w-xl mb-4">
            Updated fit for all-day comfort. A totally transformed audio
            experience. And available with Active Noise Cancellation — a first
            for this open-ear design.
          </p>
          <div className="text-sm md:text-base mb-6">
            <p>Available starting 9.20</p>
          </div>
          <div className="flex items-center justify-center space-x-4 mb-8">
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
        </div>
      </section>

      {/* Produk Unggulan */}
      <section id="produk-unggulan" className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Produk Unggulan</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Belum ada produk tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-full h-32 sm:h-40 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
                  <h3 className="text-sm sm:text-md font-semibold truncate">
                    {item.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm sm:text-base">
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
