'use client';

import { useEffect, useState } from "react";

const borrowedBooks = [
  {
    id: 1,
    title: "React for Beginners",
    author: "John Doe",
    dueDate: "2024-06-30",
    status: "Borrowed",
  },
  {
    id: 2,
    title: "TypeScript Handbook",
    author: "Jane Smith",
    dueDate: "2024-06-25",
    status: "Overdue",
  },
];

export default function MyBooks() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br relative overflow-hidden">
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
        className={`border border-blue-100 rounded-2xl p-10 max-w-2xl w-full flex flex-col items-center bg-gray-900/75 shadow-xl mt-12 relative z-10
        transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} animate-slide-up`}
      >
        <h1 className="text-2xl font-extrabold text-white mb-6 tracking-wide uppercase text-center font-sans">
          My Books
        </h1>
        {borrowedBooks.length === 0 ? (
          <p className="text-white text-center font-sans">You have not borrowed any books.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-sans">
              <thead>
                <tr>
                  <th className="py-2 px-2 text-white font-semibold">Title</th>
                  <th className="py-2 px-2 text-white font-semibold">Author</th>
                  <th className="py-2 px-2 text-white font-semibold">Due Date</th>
                  <th className="py-2 px-2 text-white font-semibold">Status</th>
                  <th className="py-2 px-2 text-white font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book, idx) => (
                  <tr
                    key={book.id}
                    className="border-t border-blue-100 hover:bg-blue-50 transition animate-fade-in"
                    style={{ animationDelay: `${0.1 + idx * 0.1}s`, animationFillMode: "backwards" }}
                  >
                    <td className="py-2 px-2">{book.title}</td>
                    <td className="py-2 px-2">{book.author}</td>
                    <td className="py-2 px-2">{book.dueDate}</td>
                    <td className="py-2 px-2">
                      <span className={
                        book.status === "Overdue"
                          ? "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold border border-red-200"
                          : "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold border border-green-200"
                      }>
                        {book.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-xs shadow">
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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