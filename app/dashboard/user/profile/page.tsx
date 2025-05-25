'use client';
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/user/profile`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
        setForm(data);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setUser(updated);
      setForm(updated);
      setEditing(false);
    } catch (err) {
    }
    setLoading(false);
  }

  // Sidebar links
  const sidebarLinks = [
    { label: "Profile", href: "/dashboard/user/profile" },
    { label: "My Books", href: "/dashboard/user/books" },
    { label: "Transactions", href: "/dashboard/user/transactions" },
    { label: "Logout", href: "/auth" },
  ];

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div>Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-700">User not found or not logged in.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex bg-gray-100 relative">
      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-gray-600/75 border-r border-gray-200 flex flex-col py-8 px-4 z-20 fixed left-0 top-0">
        <h2 className="text-xl font-bold text-black mb-8 text-center tracking-widest uppercase font-mono">Menu</h2>
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 px-3 rounded text-black font-semibold hover:bg-gray-200 hover:text-gray-900 transition uppercase tracking-wide font-mono"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 ml-56 flex items-center justify-center">
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
        <div className="bg-gray-400 border border-gray-200 rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
          <img
            src={user.avatar || "/avatar-default.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border border-gray-300 mb-4"
          />
          {!editing ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
              <div className="text-gray-500 mb-2">@{user.username}</div>
              <p className="text-gray-700 text-center mb-4">{user.bio}</p>
              <div className="flex flex-col gap-1 w-full max-w-xs mb-6">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-semibold">Member ID:</span>
                  <span>{user.memberId}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-semibold">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-semibold">Joined:</span>
                  <span>{user.joined}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-semibold">Location:</span>
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="font-semibold">Website:</span>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.website?.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded transition"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form className="w-full max-w-xs flex flex-col gap-3" onSubmit={handleSave}>
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                required
              />
              <textarea
                className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Bio"
                rows={2}
              />
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <input
                className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Website"
                type="url"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded transition"
                  onClick={() => {
                    setForm(user);
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}