'use client';
import React from 'react';
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
    return (
        <main className="min-h-screen w-full flex font-mono bg-black">
            {/* Plain Futuristic Sidebar */}
            <aside className="w-56 min-h-screen bg-black border-r border-cyan-900 flex flex-col py-8 px-4 z-20 fixed left-0 top-0">
                <h2 className="text-xl font-bold text-cyan-400 mb-8 text-center tracking-widest uppercase">ADMIN</h2>
                <nav>
                    <ul className="flex flex-col gap-2">
                        {dashboardNav.map((item) => (
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
            <div className="flex-1 ml-56 relative z-10 w-full max-w-7xl mx-auto p-8">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-cyan-300 text-center tracking-widest uppercase">
                    Admin Dashboard
                </h1>
                {/* Stats Section */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-lg border border-cyan-900 bg-black text-cyan-200 p-6 text-center font-semibold"
                        >
                            <div className="text-2xl font-extrabold mb-2">{stat.value}</div>
                            <div className="text-sm uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </section>

                {/* Graph Section */}
                <section className="bg-black border border-cyan-900 rounded-lg p-6 mb-8">
                  <Bar data={booksIssuedData} options={booksIssuedOptions} />
                </section>

                {/* Recent Transactions */}
                <section className="bg-black border border-cyan-900 rounded-lg p-6">
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
                                <tr key={idx} className="border-t border-cyan-900">
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
        </main>
    );
}