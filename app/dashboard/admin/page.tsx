'use client';
import Link from 'next/link';

const adminLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Books', href: '/dashboard/admin/books' },
  { label: 'Members', href: '/dashboard/admin/members' },
  { label: 'Transactions', href: '/dashboard/admin/transactions' },
];

export default function AdminHome() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
      <div className="border border-cyan-900 rounded-xl p-10 max-w-lg w-full flex flex-col items-center bg-black">
        <h1 className="text-3xl font-extrabold text-cyan-300 mb-6 tracking-widest uppercase text-center font-mono">
          Admin Panel
        </h1>
        <nav className="w-full">
          <ul className="flex flex-col gap-4">
            {adminLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block w-full py-3 px-6 rounded border border-cyan-900 text-cyan-200 font-semibold text-center hover:bg-cyan-950 hover:text-cyan-100 transition uppercase tracking-widest font-mono"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}