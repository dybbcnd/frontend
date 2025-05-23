"use client";

import React, { useState } from "react";
import Image from "next/image";

const books = [
  
];

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-start overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay for readability */}

      <div className="relative z-10 w-full max-w-7xl mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-white drop-shadow-lg text-center animate-fade-in">
          Browse Books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.length === 0 ? (
            <div className="col-span-full text-center text-xl text-white font-semibold animate-fade-in">
              No books available at the moment.
            </div>
          ) : (
            books.map((book, idx) => (
              <div
                key={book.id}
                className="relative bg-gray-400/70 rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in cursor-pointer"
                style={{ animationDelay: `${0.1 + idx * 0.05}s`, animationFillMode: "backwards" }}
                onClick={() => setSelectedBook(book)}
              >
                <span className="absolute left-4 top-4 bg-blue-900 text-white text-xs px-2 py-1 rounded-full shadow font-bold">{book.id}</span>
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={120}
                  height={180}
                  className="mb-4 rounded-lg shadow"
                />
                <h2 className="text-lg font-semibold text-center text-blue-800">{book.title}</h2>
                <p className="text-gray-600 text-center mb-4">by {book.author}</p>
                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow transition-colors duration-200">
                  Borrow
                </button>
              </div>
            ))
          )}
        </div>

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
            <div className="bg-gray-300 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-slide-up">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-blue-700 text-2xl font-bold"
                onClick={() => setSelectedBook(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <Image
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  width={140}
                  height={200}
                  className="mb-4 rounded-lg shadow"
                />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedBook.title}</h2>
                <p className="text-gray-700 mb-1">by <span className="font-semibold">{selectedBook.author}</span></p>
                <p className="text-gray-600 mb-2">{selectedBook.year} &middot; {selectedBook.genre}</p>
                <p className="text-gray-800 mb-4">{selectedBook.description}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition-colors duration-200">
                  Borrow
                </button>
              </div>
            </div>
          </div>
        )}

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
            animation: slide-up 0.6s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
      </div>
    </div>
  );
}