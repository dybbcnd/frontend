'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const books = [
  { id: 1, title: "React for Beginners", author: "John Doe", status: "Available" },
  { id: 2, title: "TypeScript Handbook", author: "Jane Smith", status: "Issued" },
  { id: 3, title: "Next.js in Action", author: "Alice Johnson", status: "Available" },
  { id: 4, title: "Learning JavaScript", author: "Mark Miller", status: "Available" },
];

const sidebarLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Books", href: "/dashboard/admin/books" },
  { label: "Members", href: "/dashboard/admin/members" },
  { label: "Transactions", href: "/dashboard/admin/transactions" },
];

export default function AdminBooks() {
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
            {sidebarLinks.map((link, idx) => (
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
        <div className={`w-full max-w-4xl bg-black border border-cyan-900 rounded-xl p-8 mt-10 ml-8
          transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} animate-slide-up`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <Link
              href="#"
              className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-semibold px-6 py-2 rounded-lg transition uppercase tracking-widest border border-cyan-900 font-mono animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
            >
              + Add Book
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-cyan-200 font-mono">
              <thead>
                <tr>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">ID</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Title</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Author</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Status</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, idx) => (
                  <tr
                    key={book.id}
                    className="border-t border-cyan-900 hover:bg-cyan-950 transition animate-fade-in"
                    style={{ animationDelay: `${0.3 + idx * 0.1}s`, animationFillMode: "backwards" }}
                  >
                    <td className="py-2 px-2">{book.id}</td>
                    <td className="py-2 px-2">{book.title}</td>
                    <td className="py-2 px-2">{book.author}</td>
                    <td className="py-2 px-2">
                      <span className={
                        book.status === "Available"
                          ? "bg-cyan-900 text-cyan-200 px-2 py-1 rounded font-mono border border-cyan-800 text-xs uppercase"
                          : "bg-gray-800 text-gray-200 px-2 py-1 rounded font-mono border border-gray-700 text-xs uppercase"
                      }>
                        {book.status}
                      </span>
                    </td>
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