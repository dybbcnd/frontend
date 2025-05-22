"use client";

import React from "react";
import Image from "next/image";

const books = [
  { id: 1, title: "React for Beginners", author: "John Doe", cover: "/covers/react-for-beginners.jpg" },
  { id: 2, title: "TypeScript Handbook", author: "Jane Smith", cover: "/covers/typescript-handbook.jpg" },
  { id: 3, title: "Next.js in Action", author: "Alice Johnson", cover: "/covers/nextjs-in-action.jpg" },
  { id: 4, title: "Learning JavaScript", author: "Mark Miller", cover: "/covers/learning-javascript.jpg" },
  { id: 5, title: "Advanced React Patterns", author: "Sarah Lee", cover: "/covers/advanced-react-patterns.jpg" },
  { id: 6, title: "Pro TypeScript", author: "Emily Clark", cover: "/covers/pro-typescript.jpg" },
  { id: 7, title: "Fullstack Next.js", author: "David Kim", cover: "/covers/fullstack-nextjs.jpg" },
  { id: 8, title: "JavaScript: The Good Parts", author: "Douglas Crockford", cover: "/covers/js-good-parts.jpg" },
  { id: 9, title: "React and Redux", author: "Michael Brown", cover: "/covers/react-and-redux.jpg" },
  { id: 10, title: "TypeScript in Depth", author: "Olivia Green", cover: "/covers/typescript-in-depth.jpg" },
  { id: 11, title: "Next.js Cookbook", author: "Chris White", cover: "/covers/nextjs-cookbook.jpg" },
  { id: 12, title: "JavaScript Design Patterns", author: "Anna Black", cover: "/covers/js-design-patterns.jpg" },
  { id: 13, title: "React Testing Library", author: "Paul Walker", cover: "/covers/react-testing-library.jpg" },
  { id: 14, title: "TypeScript for Professionals", author: "Sophia Turner", cover: "/covers/typescript-for-pros.jpg" },
  { id: 15, title: "Next.js for Production", author: "James Scott", cover: "/covers/nextjs-for-production.jpg" },
];

export default function BooksPage() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/40 to-blue-900/80 z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-white drop-shadow-lg text-center animate-fade-in">
          Browse Books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white/70 rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
}