'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const transactions = [
  { id: 1, member: "Alice Johnson", book: "React for Beginners", type: "Issued", date: "2024-06-01" },
  { id: 2, member: "Bob Smith", book: "TypeScript Handbook", type: "Returned", date: "2024-06-02" },
  { id: 3, member: "Carol Lee", book: "Next.js in Action", type: "Issued", date: "2024-06-03" },
  { id: 4, member: "David Kim", book: "Learning JavaScript", type: "Returned", date: "2024-06-04" },
];

const sidebarLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Books", href: "/dashboard/admin/books" },
  { label: "Members", href: "/dashboard/admin/members" },
  { label: "Transactions", href: "/dashboard/admin/transactions" },
];

export default function AdminTransactions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return (
    <main className="min-h-screen w-full flex bg-black relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-black border-r border-cyan-900 flex flex-col py-8 px-4 z-20 fixed left-0 top-0">
        <h2 className="text-xl font-bold text-cyan-400 mb-8 text-center tracking-widest uppercase font-mono">Admin Menu</h2>
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 rounded text-cyan-300 font-semibold hover:bg-cyan-950 hover:text-cyan-100 transition uppercase tracking-wide font-mono"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 ml-56 flex flex-col items-center">
        <div className={`w-full max-w-5xl bg-black border border-cyan-900 rounded-xl p-8 mt-10 ml-8
          transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} animate-slide-up`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-extrabold text-cyan-300 tracking-widest uppercase font-mono animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
              Transactions
            </h1>
            <Link
              href="#"
              className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-semibold px-6 py-2 rounded-lg transition uppercase tracking-widest border border-cyan-900 font-mono animate-fade-in"
              style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
            >
              + Add Transaction
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-cyan-200 font-mono">
              <thead>
                <tr>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">ID</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Member</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Book</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Type</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Date</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className="border-t border-cyan-900 hover:bg-cyan-950 transition animate-fade-in"
                    style={{ animationDelay: `${0.4 + idx * 0.1}s`, animationFillMode: "backwards" }}
                  >
                    <td className="py-2 px-2">{tx.id}</td>
                    <td className="py-2 px-2">{tx.member}</td>
                    <td className="py-2 px-2">{tx.book}</td>
                    <td className="py-2 px-2">
                      <span className={
                        tx.type === "Issued"
                          ? "bg-cyan-900 text-cyan-200 px-2 py-1 rounded font-mono border border-cyan-800 text-xs uppercase"
                          : "bg-gray-800 text-gray-200 px-2 py-1 rounded font-mono border border-gray-700 text-xs uppercase"
                      }>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-2 px-2">{tx.date}</td>
                    <td className="py-2 px-2 flex gap-2">
                      <button className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 px-3 py-1 rounded transition text-xs uppercase border border-cyan-800 font-mono">Edit</button>
                      <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1 rounded transition text-xs uppercase border border-gray-700 font-mono">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both;
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