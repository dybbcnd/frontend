'use client';

import { useEffect, useState } from "react";

const transactions = [
  { id: 3, book: "Next.js in Action", type: "Issued", date: "2024-05-20", status: "Returned" },
];

const sidebarLinks = [
  { label: "Home", href: "/dashboard/user/home" },
  { label: "Browse Books", href: "/books" },
  { label: "My Borrowed Books", href: "/dashboard/user/home/my-books" },
  { label: "Transaction History", href: "/dashboard/user/transactions" },
  { label: "My Profile", href: "/profile" },
];

export default function UserTransactions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return (
    <main className="min-h-screen w-full flex bg-gradient-to-br relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-gray-900/90 border-r border-blue-100 flex flex-col py-8 px-4 z-20 fixed left-0 top-0">
        <h2 className="text-xl font-bold text-blue-300 mb-8 text-center tracking-widest uppercase font-sans">Menu</h2>
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 px-3 rounded text-blue-100 font-semibold hover:bg-blue-100 hover:text-blue-900 transition uppercase tracking-wide font-sans"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 ml-56 flex flex-col items-center">
        {/* Background image */}
        <div
          className="fixed inset-0 -z-10 animate-fade-in"
          style={{
            backgroundImage: "url('/main.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <div
          className={`border border-blue-100 rounded-2xl p-10 max-w-3xl w-full flex flex-col items-center bg-gray-900/75 shadow-xl mt-12
          transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} animate-slide-up`}
        >
          <h1 className="text-2xl font-extrabold text-white mb-6 tracking-wide uppercase text-center font-sans">
            Transaction History
          </h1>
          {transactions.length === 0 ? (
            <p className="text-white text-center font-sans">No transactions found.</p>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left font-sans">
                <thead>
                  <tr>
                    <th className="py-2 px-2 text-white font-semibold">Book</th>
                    <th className="py-2 px-2 text-white font-semibold">Type</th>
                    <th className="py-2 px-2 text-white font-semibold">Date</th>
                    <th className="py-2 px-2 text-white font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr
                      key={tx.id}
                      className="border-t border-blue-100 group hover:bg-blue-100 transition animate-fade-in"
                      style={{ animationDelay: `${0.1 + idx * 0.1}s`, animationFillMode: "backwards" }}
                    >
                      <td className="py-2 px-2 group-hover:text-black transition">{tx.book}</td>
                      <td className="py-2 px-2 group-hover:text-black transition">
                        <span className={
                          tx.type === "Issued"
                            ? "bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs font-semibold border border-cyan-200"
                            : "bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold border border-gray-300"
                        }>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2 px-2 group-hover:text-black transition">{tx.date}</td>
                      <td className="py-2 px-2 group-hover:text-black transition">
                        <span className={
                          tx.status === "Returned"
                            ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold border border-green-200"
                            : tx.status === "Borrowed"
                            ? "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold border border-blue-200"
                            : "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold border border-red-200"
                        }>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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