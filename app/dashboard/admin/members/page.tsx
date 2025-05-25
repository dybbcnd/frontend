'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const initialMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", status: "Active" },
  { id: 4, name: "David Kim", email: "david@example.com", status: "Active" },
];

const dashboardNav = [
  { label: 'Overview', href: '/dashboard/admin' },
  { label: 'Books', href: '/dashboard/admin/books' },
  { label: 'Members', href: '/dashboard/admin/members'},
  { label: 'Transactions', href: '/dashboard/admin/transactions'},
];

export default function AdminMembers() {
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', status: 'Active' });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId !== null) {
      setMembers(members.map(m =>
        m.id === editId ? { ...m, ...form } : m
      ));
      setEditId(null);
    } else {
      setMembers([
        ...members,
        {
          id: members.length ? Math.max(...members.map(m => m.id)) + 1 : 1,
          name: form.name,
          email: form.email,
          status: form.status,
        }
      ]);
    }
    setForm({ name: '', email: '', status: 'Active' });
    setShowAdd(false);
  }

  function handleEdit(memberId: number) {
    const member = members.find(m => m.id === memberId);
    if (member) {
      setForm({ name: member.name, email: member.email, status: member.status });
      setEditId(memberId);
      setShowAdd(true);
    }
  }

  function handleDelete(memberId: number) {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  }

  return (
    <main className="min-h-screen w-full flex bg-black p-8 relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-black border-r border-cyan-900 flex flex-col py-8 px-4 z-20 fixed left-0 top-0">
        <h2 className="text-xl font-bold text-cyan-400 mb-8 text-center tracking-widest uppercase font-mono">ADMIN MENU</h2>
        <nav>
          <ul className="flex flex-col gap-2">
            {dashboardNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 px-3 rounded text-cyan-300 font-semibold hover:bg-cyan-950 hover:text-cyan-200 transition uppercase tracking-wide font-mono"
                >
                  {item.label}
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
            <button
              onClick={() => {
                setShowAdd(true);
                setEditId(null);
                setForm({ name: '', email: '', status: 'Active' });
              }}
              className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-semibold px-6 py-2 rounded-lg transition uppercase tracking-widest border border-cyan-900 font-mono animate-fade-in"
              style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
            >
              + Add Member
            </button>
          </div>

          {/* Add/Edit Member Modal */}
          {showAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
              <div className="bg-black border border-cyan-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-slide-up">
                <button
                  className="absolute top-3 right-3 text-cyan-400 hover:text-cyan-200 text-2xl font-bold"
                  onClick={() => {
                    setShowAdd(false);
                    setEditId(null);
                    setForm({ name: '', email: '', status: 'Active' });
                  }}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold text-cyan-300 mb-6 text-center uppercase tracking-widest">
                  {editId !== null ? "Edit Member" : "Add Member"}
                </h2>
                <form onSubmit={handleAdd} className="flex flex-col gap-4">
                  <input
                    className="rounded px-3 py-2 bg-black text-cyan-100 border border-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                  <input
                    className="rounded px-3 py-2 bg-black text-cyan-100 border border-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <select
                    className="rounded px-3 py-2 bg-black text-cyan-100 border border-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-semibold px-6 py-2 rounded-lg transition uppercase tracking-widest border border-cyan-900 font-mono"
                    >
                      {editId !== null ? "Save" : "Add"}
                    </button>
                    <button
                      type="button"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-6 py-2 rounded-lg transition uppercase tracking-widest border border-gray-700 font-mono"
                      onClick={() => {
                        setShowAdd(false);
                        setEditId(null);
                        setForm({ name: '', email: '', status: 'Active' });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-cyan-200 font-mono">
              <thead>
                <tr>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">ID</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Name</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Email</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Status</th>
                  <th className="py-2 px-2 text-cyan-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => (
                  <tr
                    key={member.id}
                    className="border-t border-cyan-900 hover:bg-cyan-950 transition animate-fade-in"
                    style={{ animationDelay: `${0.4 + idx * 0.1}s`, animationFillMode: "backwards" }}
                  >
                    <td className="py-2 px-2">{member.id}</td>
                    <td className="py-2 px-2">{member.name}</td>
                    <td className="py-2 px-2">{member.email}</td>
                    <td className="py-2 px-2">
                      <span className={
                        member.status === "Active"
                          ? "bg-cyan-900 text-cyan-200 px-2 py-1 rounded font-mono border border-cyan-800 text-xs uppercase"
                          : "bg-gray-800 text-gray-200 px-2 py-1 rounded font-mono border border-gray-700 text-xs uppercase"
                      }>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 flex gap-2">
                      <button
                        className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 px-3 py-1 rounded transition text-xs uppercase border border-cyan-800 font-mono"
                        onClick={() => handleEdit(member.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1 rounded transition text-xs uppercase border border-gray-700 font-mono"
                        onClick={() => handleDelete(member.id)}
                      >
                        Delete
                      </button>
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