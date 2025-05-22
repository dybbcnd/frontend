import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
        style={{
          backgroundImage: "url('/main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/40 to-blue-900/80 backdrop-blur-sm"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center justify-center">
          <div className="mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg text-white">
              Welcome to <span className="text-blue-300">The Library</span>
            </h1>
            <p className="text-2xl mt-6 drop-shadow-lg text-blue-100 animate-fade-in delay-100">
              Borrow your favorite books and explore new worlds
            </p>
            <Link
              href="auth"
              className="bg-blue-600/90 hover:bg-blue-700/90 transition-colors text-white py-3 px-8 mt-8 inline-block rounded-full text-lg font-semibold shadow-lg animate-fade-in delay-200"
            >
              Get Started
            </Link>
          </div>

          {/* Features Section */}
          <div className="container mx-auto text-center mt-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white drop-shadow animate-fade-in">
              Library Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in">
                <Image
                  src="/file.svg"
                  alt="Book Catalog"
                  width={60}
                  height={60}
                  className="mx-auto mb-4"
                />
                <h4 className="mt-2 text-xl font-semibold text-blue-800">
                  Extensive Book Catalog
                </h4>
                <p className="text-gray-700 mt-2">
                  Browse thousands of titles across all genres and categories.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in delay-100">
                <Image
                  src="/window.svg"
                  alt="Borrowing"
                  width={60}
                  height={60}
                  className="mx-auto mb-4"
                />
                <h4 className="mt-2 text-xl font-semibold text-blue-800">
                  Easy Borrowing System
                </h4>
                <p className="text-gray-700 mt-2">
                  Reserve, borrow, and return books with a few clicks.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in delay-200">
                <Image
                  src="/globe.svg"
                  alt="User Profiles"
                  width={60}
                  height={60}
                  className="mx-auto mb-4"
                />
                <h4 className="mt-2 text-xl font-semibold text-blue-800">
                  User Profiles
                </h4>
                <p className="text-gray-700 mt-2">
                  Track borrowed books, due dates, and reading history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-center py-8 mt-auto shadow-inner">
        <p className="mb-0 font-medium tracking-wide">
          © librarians. All rights reserved.
        </p>
      </footer>
    </div>
  );
}