'use client';
import Link from 'next/link';

const books = [
  { id: 1, title: "React for Beginners", author: "John Doe", status: "Available" },
  { id: 2, title: "TypeScript Handbook", author: "Jane Smith", status: "Issued" },
  { id: 3, title: "Next.js in Action", author: "Alice Johnson", status: "Available" },
  { id: 4, title: "Learning JavaScript", author: "Mark Miller", status: "Available" },
];

export default function AdminBooks() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-black p-8">
      <div className="w-full max-w-4xl bg-black border border-cyan-900 rounded-xl p-8 mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <Link
            href="#"
            className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-semibold px-6 py-2 rounded-lg transition uppercase tracking-widest border border-cyan-900 font-mono"
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
              {books.map(book => (
                <tr
                  key={book.id}
                  className="border-t border-cyan-900 hover:bg-cyan-950 transition"
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
    </main>
  );
}