'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dashboardNav = [
    { label: 'Overview', href: '/dashboard/admin' },
    { label: 'Books', href: '/dashboard/admin/books' },
    { label: 'Members', href: '/dashboard/admin/members'},
    { label: 'Transactions', href: '/dashboard/admin/transactions'},
];

const stats = [
    { label: 'Total Books', value: 3200 },
    { label: 'Total Members', value: 450 },
    { label: 'Books Issued', value: 120 },
    { label: 'Books Returned', value: 110 },
];

const recentTransactions = [
    { member: 'Alice Johnson', book: 'React for Beginners', type: 'Issued', date: '2024-06-01' },
    { member: 'Bob Smith', book: 'TypeScript Handbook', type: 'Returned', date: '2024-06-02' },
    { member: 'Carol Lee', book: 'Next.js in Action', type: 'Issued', date: '2024-06-03' },
];

const booksIssuedData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Books Issued',
      data: [30, 45, 60, 50, 70, 80, 65, 75, 60, 55, 40, 50],
      backgroundColor: 'rgba(34,211,238,0.7)', // cyan-400
      borderRadius: 8,
    },
  ],
};

const booksIssuedOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Books Issued per Month',
      color: '#22d3ee',
      font: { size: 18, weight: 'bold', family: 'monospace' },
    },
  },
  scales: {
    x: {
      ticks: { color: '#22d3ee', font: { weight: 'bold', family: 'monospace' } },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#22d3ee', font: { family: 'monospace' } },
      grid: { color: '#0e7490' },
    },
  },
};

export default function AdminDashboard() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        return () => setVisible(false);
    }, []);

    return (
        <main className="min-h-screen w-full flex font-mono bg-black">
            {/* Sidebar */}
            <aside className="w-56 min-h-screen bg-black border-r border-cyan-900 flex flex-col py-8 px-4 z-20 fixed left-0 top-0">
                <h2 className="text-xl font-bold text-cyan-400 mb-8 text-center tracking-widest uppercase">ADMIN MENU</h2>
                <nav>
                    <ul className="flex flex-col gap-2">
                        {dashboardNav.map((item, idx) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block py-2 px-3 rounded text-cyan-300 font-semibold hover:bg-cyan-950 hover:text-cyan-200 transition uppercase tracking-wide"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 ml-56 relative z-10 w-full max-w-7xl mx-auto p-8 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} animate-slide-up`}>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-cyan-300 text-center tracking-widest uppercase animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
                    Admin Dashboard
                </h1>
                {/* Stats Section */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div
                            key={stat.label}
                            className="rounded-lg border border-cyan-900 bg-black text-cyan-200 p-6 text-center font-semibold animate-fade-in"
                            style={{ animationDelay: `${0.3 + idx * 0.1}s`, animationFillMode: "backwards" }}
                        >
                            <div className="text-2xl font-extrabold mb-2">{stat.value}</div>
                            <div className="text-sm uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </section>

                {/* Graph Section */}
                <section className="bg-black border border-cyan-900 rounded-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}>
                  <Bar data={booksIssuedData} options={booksIssuedOptions} />
                </section>

                {/* Recent Transactions */}
                <section className="bg-black border border-cyan-900 rounded-lg p-6 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "backwards" }}>
                    <h2 className="text-lg font-bold mb-4 text-cyan-300 tracking-widest uppercase">Recent Transactions</h2>
                    <table className="w-full text-left text-cyan-200 font-mono">
                        <thead>
                            <tr>
                                <th className="py-2 text-cyan-400">Member</th>
                                <th className="py-2 text-cyan-400">Book</th>
                                <th className="py-2 text-cyan-400">Type</th>
                                <th className="py-2 text-cyan-400">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((tx, idx) => (
                                <tr key={idx} className="border-t border-cyan-900 animate-fade-in" style={{ animationDelay: `${0.9 + idx * 0.1}s`, animationFillMode: "backwards" }}>
                                    <td className="py-2">{tx.member}</td>
                                    <td className="py-2">{tx.book}</td>
                                    <td className="py-2">
                                        <span className={
                                            tx.type === "Issued"
                                                ? "bg-cyan-900 text-cyan-200 px-2 py-1 rounded"
                                                : "bg-gray-800 text-gray-200 px-2 py-1 rounded"
                                        }>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-2">{tx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
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