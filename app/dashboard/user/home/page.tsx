'use client';

import { useEffect, useState } from "react";

export default function UserHome() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br relative overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 -z-10 animate-fade-in"
        style={{
          backgroundImage: "url('/main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className={`border border-blue-100 rounded-2xl p-10 max-w-xl w-full flex flex-col items-center bg-gray-900/75 shadow-xl relative z-10
        transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} animate-slide-up`}
      >
        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-wide uppercase text-center font-sans transition-all duration-700">
          Welcome to the Library
        </h1>

        <div className="flex flex-col gap-4 w-full">
          <a
            href="/books"
            className="block w-full py-3 px-6 rounded-lg border border-blue-200 text-white font-semibold text-center hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 uppercase tracking-wide font-sans shadow animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            Browse Books
          </a>
          <a
            href="/dashboard/user/home/my-books"
            className="block w-full py-3 px-6 rounded-lg border border-blue-200 text-white font-semibold text-center hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 uppercase tracking-wide font-sans shadow animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            My Borrowed Books
          </a>
          <a
            href="/dashboard/user/transactions"
            className="block w-full py-3 px-6 rounded-lg border border-blue-200 text-white font-semibold text-center hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 uppercase tracking-wide font-sans shadow animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
          >
            Transaction History
          </a>
          <a
            href="/profile"
            className="block w-full py-3 px-6 rounded-lg border border-blue-200 text-white font-semibold text-center hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 uppercase tracking-wide font-sans shadow animate-fade-in"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            My Profile
          </a>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fade-in {
          animation: fade-in 1s ease both;
        }
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </main>
  );
}