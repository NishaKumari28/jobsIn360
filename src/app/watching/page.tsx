"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SubUser {
  id: string;
  name: string;
  emoji: string;
  role: "host" | "member";
  access: {
    courses: boolean;
    jobs: boolean;
    resume: boolean;
    social: boolean;
  };
}

export default function Watching() {
  const router = useRouter();
  const [users, setUsers] = useState<SubUser[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showAccessPopup, setShowAccessPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SubUser | null>(null);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("👤");
  const [newAccess, setNewAccess] = useState({
    courses: true,
    jobs: true,
    resume: true,
    social: false,
  });

  const emojiOptions = ["👨", "👩", "🧒", "👦", "👧", "🧑", "👴", "👵", "🧔", "👱"];

  // Load users from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("watchingUsers");
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      // Pehli baar — Host auto create karo
      const host: SubUser = {
        id: "host",
        name: "You (Host)",
        emoji: "👑",
        role: "host",
        access: {
          courses: true,
          jobs: true,
          resume: true,
          social: true,
        },
      };
      setUsers([host]);
      localStorage.setItem("watchingUsers", JSON.stringify([host]));
    }
  }, []);

  const saveUsers = (updated: SubUser[]) => {
    setUsers(updated);
    localStorage.setItem("watchingUsers", JSON.stringify(updated));
  };

  const handleAddUser = () => {
    if (!newName.trim()) return;
    const newUser: SubUser = {
      id: Date.now().toString(),
      name: newName,
      emoji: newEmoji,
      role: "member",
      access: newAccess,
    };
    saveUsers([...users, newUser]);
    setNewName("");
    setNewEmoji("👤");
    setNewAccess({ courses: true, jobs: true, resume: true, social: false });
    setShowAddPopup(false);
  };

  const handleDeleteUser = (id: string) => {
    if (id === "host") return;
    saveUsers(users.filter((u) => u.id !== id));
  };

  const handleUpdateAccess = () => {
    if (!selectedUser) return;
    const updated = users.map((u) =>
      u.id === selectedUser.id ? { ...u, access: selectedUser.access } : u
    );
    saveUsers(updated);
    setShowAccessPopup(false);
    setSelectedUser(null);
  };

  const accessLabels = [
    { key: "courses", label: "Courses", icon: "🎓" },
    { key: "jobs", label: "Job Board", icon: "💼" },
    { key: "resume", label: "Resume", icon: "📄" },
    { key: "social", label: "Social Feed", icon: "📱" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="JobsIn360"
            className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-2xl"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Who's Watching?</h1>
          <p className="text-gray-400 text-sm">Select your profile to continue</p>
        </div>

        {/* Profiles Grid */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">

          {/* User profiles */}
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-2 group relative">

              {/* Profile Card */}
              <button
                onClick={() => router.push("/home")}
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl transition-all duration-200 group-hover:scale-110 relative"
                style={{
                  background: user.role === "host"
                    ? "linear-gradient(135deg, rgba(108,99,255,0.3), rgba(219,39,119,0.2))"
                    : "rgba(255,255,255,0.05)",
                  border: user.role === "host"
                    ? "2px solid #6C63FF"
                    : "2px solid #374151",
                  boxShadow: user.role === "host"
                    ? "0 0 20px rgba(108,99,255,0.3)"
                    : "none",
                }}
              >
                {user.emoji}
                {user.role === "host" && (
                  <span className="absolute -top-2 -right-2 bg-[#6C63FF] text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    HOST
                  </span>
                )}
              </button>

              <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                {user.name}
              </span>

              {/* Host controls — sirf host ke liye */}
              {user.role === "host" && users.length > 1 && (
                <div className="flex gap-1">
                  {users.filter(u => u.role !== "host").map(u => null)}
                </div>
              )}

              {/* Member controls — sirf members pe */}
              {user.role === "member" && (
                <div className="flex gap-2 mt-1">
                  {/* Edit Access */}
                  <button
                    onClick={() => {
                      setSelectedUser({ ...user });
                      setShowAccessPopup(true);
                    }}
                    className="text-xs text-gray-500 hover:text-[#6C63FF] transition-colors"
                    title="Edit Access"
                  >
                    ✏️
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    title="Delete User"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* + Add User button */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setShowAddPopup(true)}
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl transition-all duration-200 hover:scale-110 border-2 border-dashed border-[#374151] hover:border-[#6C63FF] text-gray-500 hover:text-[#6C63FF]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              ➕
            </button>
            <span className="text-gray-500 text-sm">Add User</span>
          </div>

        </div>

        {/* Access info for members */}
        {users.length > 1 && (
          <p className="text-center text-gray-600 text-xs">
            ✏️ Edit access &nbsp; 🗑️ Delete user &nbsp; (Host only)
          </p>
        )}

      </div>

      {/* ── ADD USER POPUP ── */}
      {showAddPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm bg-[#111827] rounded-2xl p-6 border border-[#2D1B69] relative"
            style={{ boxShadow: '0 0 30px 4px rgba(139,92,246,0.25), 0 0 60px 8px rgba(219,39,119,0.15)' }}
          >
            <button
              onClick={() => setShowAddPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add New User</h3>
            <p className="text-gray-400 text-sm mb-5">Create a sub-account with custom access</p>

            {/* Name */}
            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-1 block">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
                className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#6C63FF] transition-all"
              />
            </div>

            {/* Emoji picker */}
            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-2 block">Choose Avatar</label>
              <div className="flex gap-2 flex-wrap">
                {emojiOptions.map((e) => (
                  <button
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={`w-10 h-10 rounded-xl text-2xl transition-all ${
                      newEmoji === e
                        ? "bg-[#6C63FF] scale-110"
                        : "bg-[#1F2937] hover:bg-[#374151]"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Access Controls */}
            <div className="mb-6">
              <label className="text-gray-400 text-xs mb-2 block">Access Permissions</label>
              <div className="space-y-2">
                {accessLabels.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between bg-[#1F2937] rounded-xl px-4 py-3"
                  >
                    <span className="text-white text-sm">
                      {item.icon} {item.label}
                    </span>
                    <button
                      onClick={() => setNewAccess(prev => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof prev]
                      }))}
                      className={`w-10 h-6 rounded-full transition-all relative ${
                        newAccess[item.key as keyof typeof newAccess]
                          ? "bg-[#6C63FF]"
                          : "bg-[#374151]"
                      }`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                        newAccess[item.key as keyof typeof newAccess] ? "left-4" : "left-0.5"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddUser}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                newName.trim()
                  ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                  : "bg-[#374151] cursor-not-allowed opacity-50"
              }`}
            >
              Create User
            </button>
          </div>
        </div>
      )}

      {/* ── EDIT ACCESS POPUP ── */}
      {showAccessPopup && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm bg-[#111827] rounded-2xl p-6 border border-[#2D1B69] relative"
            style={{ boxShadow: '0 0 30px 4px rgba(139,92,246,0.25), 0 0 60px 8px rgba(219,39,119,0.15)' }}
          >
            <button
              onClick={() => { setShowAccessPopup(false); setSelectedUser(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="text-4xl mb-2">{selectedUser.emoji}</div>
              <h3 className="text-lg font-bold text-white">Edit Access</h3>
              <p className="text-gray-400 text-sm">{selectedUser.name}</p>
            </div>

            <div className="space-y-2 mb-6">
              {accessLabels.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between bg-[#1F2937] rounded-xl px-4 py-3"
                >
                  <span className="text-white text-sm">{item.icon} {item.label}</span>
                  <button
                    onClick={() => setSelectedUser(prev => prev ? {
                      ...prev,
                      access: {
                        ...prev.access,
                        [item.key]: !prev.access[item.key as keyof typeof prev.access]
                      }
                    } : prev)}
                    className={`w-10 h-6 rounded-full transition-all relative ${
                      selectedUser.access[item.key as keyof typeof selectedUser.access]
                        ? "bg-[#6C63FF]"
                        : "bg-[#374151]"
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                      selectedUser.access[item.key as keyof typeof selectedUser.access] ? "left-4" : "left-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpdateAccess}
              className="w-full py-3 rounded-xl font-semibold text-white bg-[#6C63FF] hover:bg-[#5A52E0] transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

    </main>
  );
}