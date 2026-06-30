"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

// --- Types ---
type UserPermission = "edit_resume" | "search_jobs" | "view_courses" | "apply_jobs" | "view_analytics";
type ManagedUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  date: string;
  permissions: UserPermission[];
};

const ALL_PERMISSIONS: { key: UserPermission; label: string; icon: string }[] = [
  { key: "edit_resume", label: "Edit Resume", icon: "📄" },
  { key: "search_jobs", label: "Search Jobs", icon: "🔍" },
  { key: "view_courses", label: "View Courses", icon: "📚" },
  { key: "apply_jobs", label: "Apply to Jobs", icon: "✉️" },
  { key: "view_analytics", label: "View Analytics", icon: "📊" },
];

// --- Circular Progress Component ---
const CircularProgress = ({ percentage, size = 160, strokeWidth = 12 }: { percentage: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage < 40 ? "#EF4444" : percentage < 70 ? "#F59E0B" : percentage < 100 ? "#3B82F6" : "#10B981";
  const label = percentage < 40 ? "Beginner" : percentage < 70 ? "Intermediate" : percentage < 100 ? "Advanced" : "All Star ⭐";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-primary)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="progress-ring-circle"
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
      </svg>
      <div style={{ position: "relative", marginTop: -size / 2 - 24, textAlign: "center", width: size }}>
        <span style={{ fontSize: 36, fontWeight: 800, color }}>{percentage}%</span>
        <p style={{ fontSize: 12, fontWeight: 600, color, marginTop: 2 }}>{label}</p>
      </div>
      <div style={{ height: size / 2 - 24 }} />
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // --- State ---
  const [isHost, setIsHost] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Host-added users only (starts empty)
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [newUserForm, setNewUserForm] = useState({ name: "", email: "", role: "Candidate", permissions: [] as UserPermission[] });

  // --- Profile State ---
  const [profile, setProfile] = useState({
    name: "", headline: "", location: "", phone: "", email: "",
    experience: [] as { id: number; company: string; role: string; duration: string }[],
    education: [] as { id: number; school: string; degree: string; year: string }[],
    skills: [] as string[],
    resumeUploaded: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [showExpForm, setShowExpForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);
  const [expForm, setExpForm] = useState({ company: "", role: "", duration: "" });
  const [eduForm, setEduForm] = useState({ school: "", degree: "", year: "" });

  // --- Profile Completion ---
  const getProfileCompletion = () => {
    let score = 0;
    const sections: { name: string; weight: number; done: boolean; tip: string }[] = [
      { name: "Basic Info", weight: 20, done: !!(profile.name && profile.headline && profile.location), tip: "Add your name, headline & location to get +20%" },
      { name: "Contact", weight: 10, done: !!(profile.phone && profile.email), tip: "Add phone & email for +10%" },
      { name: "Experience", weight: 25, done: profile.experience.length > 0, tip: "Add at least one work experience for +25%" },
      { name: "Education", weight: 20, done: profile.education.length > 0, tip: "Add your education details for +20%" },
      { name: "Skills", weight: 15, done: profile.skills.length >= 3, tip: "Add at least 3 skills for +15%" },
      { name: "Resume", weight: 10, done: profile.resumeUploaded, tip: "Upload your resume for +10%" },
    ];
    sections.forEach(s => { if (s.done) score += s.weight; });
    return { score, sections };
  };
  const { score: profileScore, sections: profileSections } = getProfileCompletion();
  const incompleteSections = profileSections.filter(s => !s.done);

  // --- Handlers ---
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;
    const newUser: ManagedUser = {
      id: Date.now(), name: newUserForm.name, email: newUserForm.email, role: newUserForm.role,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      permissions: newUserForm.permissions,
    };
    setUsers([newUser, ...users]);
    setNewUserForm({ name: "", email: "", role: "Candidate", permissions: [] });
    setIsAddUserModalOpen(false);
  };

  const togglePermission = (perm: UserPermission, target: "form" | number) => {
    if (target === "form") {
      setNewUserForm(prev => ({
        ...prev,
        permissions: prev.permissions.includes(perm) ? prev.permissions.filter(p => p !== perm) : [...prev.permissions, perm]
      }));
    } else {
      setUsers(prev => prev.map(u => u.id === target ? {
        ...u, permissions: u.permissions.includes(perm) ? u.permissions.filter(p => p !== perm) : [...u.permissions, perm]
      } : u));
    }
  };

  // --- Theme-aware style helpers ---
  const t = {
    bg: "var(--bg-primary)", bgSec: "var(--bg-secondary)", card: "var(--bg-card)", input: "var(--bg-input)",
    hover: "var(--bg-hover)", border: "var(--border-primary)", border2: "var(--border-secondary)",
    text: "var(--text-primary)", textSec: "var(--text-secondary)", muted: "var(--text-muted)", dim: "var(--text-dim)",
    accent: "var(--accent)", pink: "var(--accent-pink)", nav: "var(--nav-bg)", overlay: "var(--overlay-bg)",
  };

  // --- Sidebar Item ---
  const SidebarItem = ({ id, icon, label, requiresHost = false }: { id: string; icon: string; label: string; requiresHost?: boolean }) => {
    if (requiresHost && !isHost) return null;
    const isActive = activeTab === id;
    return (
      <div onClick={() => setActiveTab(id)} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, cursor: "pointer",
        marginBottom: 4, transition: "all 0.2s",
        background: isActive ? "linear-gradient(135deg, #6C63FF, #DB2777)" : "transparent",
        color: isActive ? "#fff" : t.muted,
      }}
        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = t.hover; e.currentTarget.style.color = t.text; } }}
        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.muted; } }}
      >
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontWeight: 500, fontSize: 14 }}>{label}</span>
      </div>
    );
  };

  // --- Dashboard Tab ---
  const renderDashboard = () => (
    <>
      <div style={{ borderRadius: 16, padding: 32, marginBottom: 24, border: `1px solid #2D1B69`, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #1a1a3e 0%, #111827 100%)", boxShadow: "0 0 30px 4px rgba(139,92,246,0.15)" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Find Your Dream Job <span style={{ color: "#6C63FF" }}>in 360°</span></h1>
        <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 24, maxWidth: 460 }}>Explore thousands of opportunities waiting for you.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "#6C63FF", color: "#fff", padding: "12px 24px", borderRadius: 12, border: "none", fontWeight: 600, cursor: "pointer" }}>Browse Jobs</button>
          <button onClick={() => router.push("/resume")} style={{ background: "transparent", color: "#fff", padding: "12px 24px", borderRadius: 12, border: "1px solid #374151", fontWeight: 600, cursor: "pointer" }}>Update Resume</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
        {[
          { label: "Jobs Posted", value: "12,400+", icon: "💼", color: "#6C63FF" },
          { label: "Companies", value: "3,200+", icon: "🏢", color: "#DB2777" },
          { label: "Hired Today", value: "840+", icon: "🎉", color: "#10B981" },
        ].map(stat => (
          <div key={stat.label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: stat.color + "22" }}>{stat.icon}</div>
            <div><div style={{ color: t.text, fontWeight: 700, fontSize: 24 }}>{stat.value}</div><div style={{ color: t.dim, fontSize: 14 }}>{stat.label}</div></div>
          </div>
        ))}
      </div>
      <h3 style={{ color: t.text, fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Quick Actions</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { icon: "🔍", label: "Search Jobs", color: "#6C63FF", action: () => setActiveTab("search") },
          { icon: "📄", label: "My Resume", color: "#DB2777", action: () => router.push("/resume") },
          { icon: "📌", label: "Saved Jobs", color: "#F59E0B", action: () => setActiveTab("saved") },
          { icon: "🔔", label: "Alerts", color: "#10B981", action: () => {} },
        ].map(item => (
          <div key={item.label} onClick={item.action} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: item.color + "22" }}>{item.icon}</div>
            <span style={{ color: t.textSec, fontWeight: 500, fontSize: 14 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );

  // --- Host Panel Tab ---
  const renderHostPanel = () => (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24, minHeight: "60vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 4 }}>User Management</h2>
          <p style={{ color: t.muted, fontSize: 14 }}>Users you have added will appear here. Assign and manage their permissions.</p>
        </div>
        <button onClick={() => setIsAddUserModalOpen(true)} style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#fff", padding: "10px 20px", borderRadius: 12, border: "none", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span>➕</span> Add New User
        </button>
      </div>

      {users.length === 0 ? (
        <div style={{ padding: 60, textAlign: "center", border: `2px dashed ${t.border}`, borderRadius: 16 }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>👥</div>
          <h3 style={{ color: t.text, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No Users Yet</h3>
          <p style={{ color: t.dim, fontSize: 14, marginBottom: 20 }}>Click "Add New User" to get started managing your team.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {users.map(user => (
            <div key={user.id} style={{ background: t.input, border: `1px solid ${t.border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6C63FF, #DB2777)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>{user.name.charAt(0)}</div>
                  <div>
                    <p style={{ color: t.text, fontWeight: 600, margin: 0 }}>{user.name}</p>
                    <p style={{ color: t.dim, fontSize: 13, margin: 0 }}>{user.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, fontWeight: 500, background: user.role === "Recruiter" ? "rgba(219,39,119,0.1)" : "rgba(59,130,246,0.1)", color: user.role === "Recruiter" ? "#DB2777" : "#3B82F6", border: `1px solid ${user.role === "Recruiter" ? "rgba(219,39,119,0.2)" : "rgba(59,130,246,0.2)"}` }}>{user.role}</span>
                  <span style={{ color: t.dim, fontSize: 12 }}>{user.date}</span>
                </div>
              </div>
              {/* Permissions */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <p style={{ color: t.muted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>Permissions</p>
                  <button onClick={() => setEditingUserId(editingUserId === user.id ? null : user.id)} style={{ background: "none", border: "none", color: "#6C63FF", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                    {editingUserId === user.id ? "Done" : "Edit Permissions"}
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {editingUserId === user.id ? (
                    ALL_PERMISSIONS.map(p => (
                      <button key={p.key} onClick={() => togglePermission(p.key, user.id)} style={{
                        padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid",
                        background: user.permissions.includes(p.key) ? "rgba(108,99,255,0.15)" : "transparent",
                        color: user.permissions.includes(p.key) ? "#6C63FF" : t.dim,
                        borderColor: user.permissions.includes(p.key) ? "rgba(108,99,255,0.3)" : t.border,
                      }}>{p.icon} {p.label}</button>
                    ))
                  ) : (
                    user.permissions.length > 0 ? user.permissions.map(pKey => {
                      const p = ALL_PERMISSIONS.find(ap => ap.key === pKey);
                      return p ? <span key={pKey} style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>{p.icon} {p.label}</span> : null;
                    }) : <span style={{ color: t.dim, fontSize: 13 }}>No permissions assigned yet.</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // --- Profile Tab ---
  const renderProfile = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Progress Header with Circular Ring on the Right */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 8 }}>Profile Strength</h2>
          <p style={{ color: t.muted, fontSize: 14, marginBottom: 20 }}>
            {profileScore === 100 ? "Your profile is complete! 🎉" : "Complete your profile to stand out to recruiters."}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profileSections.map(s => (
              <span key={s.name} style={{
                fontSize: 12, padding: "6px 14px", borderRadius: 20, fontWeight: 500,
                background: s.done ? "rgba(16,185,129,0.1)" : t.hover,
                color: s.done ? "#10B981" : t.dim,
                border: `1px solid ${s.done ? "rgba(16,185,129,0.2)" : t.border}`,
              }}>
                {s.done ? "✓" : "○"} {s.name} ({s.weight}%)
              </span>
            ))}
          </div>
        </div>
        <CircularProgress percentage={profileScore} />
      </div>

      {/* Suggested Actions */}
      {incompleteSections.length > 0 && (
        <div>
          <h3 style={{ color: t.text, fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Suggested for you</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {incompleteSections.slice(0, 4).map(s => (
              <div key={s.name} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(108,99,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💡</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: t.text, fontSize: 14, fontWeight: 500, margin: 0 }}>{s.tip}</p>
                  <p style={{ color: t.dim, fontSize: 12, margin: "4px 0 0" }}>+{s.weight}% profile completion</p>
                </div>
                <span style={{ color: "#6C63FF", fontSize: 20 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Basic Info */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16 }}>👤 Basic Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Full Name", key: "name", ph: "Your full name" },
            { label: "Professional Headline", key: "headline", ph: "e.g. Full Stack Developer" },
            { label: "Location", key: "location", ph: "City, Country" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 6 }}>{f.label}</label>
              <input type="text" value={(profile as any)[f.key]} onChange={e => setProfile({ ...profile, [f.key]: e.target.value })} placeholder={f.ph}
                style={{ width: "100%", background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "12px 16px", color: t.text, outline: "none", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16 }}>📧 Contact Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 6 }}>Email</label>
            <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="you@example.com"
              style={{ width: "100%", background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "12px 16px", color: t.text, outline: "none", fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 6 }}>Phone</label>
            <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 12345 67890"
              style={{ width: "100%", background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "12px 16px", color: t.text, outline: "none", fontSize: 14, boxSizing: "border-box" }} />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text }}>💼 Experience</h3>
          <button onClick={() => setShowExpForm(!showExpForm)} style={{ background: "none", border: "none", color: "#6C63FF", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>{showExpForm ? "Cancel" : "+ Add Experience"}</button>
        </div>
        {showExpForm && (
          <div style={{ background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: 16, marginBottom: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} placeholder="Company Name" style={{ background: t.card, border: `1px solid ${t.border2}`, borderRadius: 10, padding: "10px 14px", color: t.text, outline: "none", fontSize: 14 }} />
            <input type="text" value={expForm.role} onChange={e => setExpForm({ ...expForm, role: e.target.value })} placeholder="Job Title" style={{ background: t.card, border: `1px solid ${t.border2}`, borderRadius: 10, padding: "10px 14px", color: t.text, outline: "none", fontSize: 14 }} />
            <input type="text" value={expForm.duration} onChange={e => setExpForm({ ...expForm, duration: e.target.value })} placeholder="e.g. Jan 2022 - Present" style={{ background: t.card, border: `1px solid ${t.border2}`, borderRadius: 10, padding: "10px 14px", color: t.text, outline: "none", fontSize: 14 }} />
            <button onClick={() => { if (expForm.company && expForm.role) { setProfile({ ...profile, experience: [...profile.experience, { id: Date.now(), ...expForm }] }); setExpForm({ company: "", role: "", duration: "" }); setShowExpForm(false); } }}
              style={{ background: "linear-gradient(135deg, #6C63FF, #DB2777)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>Save</button>
          </div>
        )}
        {profile.experience.length === 0 && !showExpForm && <p style={{ color: t.dim, fontSize: 14 }}>No experience added yet.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {profile.experience.map(exp => (
            <div key={exp.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: t.input, border: `1px solid ${t.border}`, borderRadius: 12, padding: 16 }}>
              <div><p style={{ color: t.text, fontWeight: 600, margin: 0 }}>{exp.role}</p><p style={{ color: t.dim, fontSize: 13, margin: "4px 0 0" }}>{exp.company} · {exp.duration}</p></div>
              <button onClick={() => setProfile({ ...profile, experience: profile.experience.filter(e => e.id !== exp.id) })} style={{ background: "none", border: "none", color: t.dim, cursor: "pointer", fontSize: 18 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text }}>🎓 Education</h3>
          <button onClick={() => setShowEduForm(!showEduForm)} style={{ background: "none", border: "none", color: "#6C63FF", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>{showEduForm ? "Cancel" : "+ Add Education"}</button>
        </div>
        {showEduForm && (
          <div style={{ background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: 16, marginBottom: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" value={eduForm.school} onChange={e => setEduForm({ ...eduForm, school: e.target.value })} placeholder="School / University" style={{ background: t.card, border: `1px solid ${t.border2}`, borderRadius: 10, padding: "10px 14px", color: t.text, outline: "none", fontSize: 14 }} />
            <input type="text" value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} placeholder="Degree / Certificate" style={{ background: t.card, border: `1px solid ${t.border2}`, borderRadius: 10, padding: "10px 14px", color: t.text, outline: "none", fontSize: 14 }} />
            <input type="text" value={eduForm.year} onChange={e => setEduForm({ ...eduForm, year: e.target.value })} placeholder="e.g. 2020 - 2024" style={{ background: t.card, border: `1px solid ${t.border2}`, borderRadius: 10, padding: "10px 14px", color: t.text, outline: "none", fontSize: 14 }} />
            <button onClick={() => { if (eduForm.school && eduForm.degree) { setProfile({ ...profile, education: [...profile.education, { id: Date.now(), ...eduForm }] }); setEduForm({ school: "", degree: "", year: "" }); setShowEduForm(false); } }}
              style={{ background: "linear-gradient(135deg, #6C63FF, #DB2777)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>Save</button>
          </div>
        )}
        {profile.education.length === 0 && !showEduForm && <p style={{ color: t.dim, fontSize: 14 }}>No education added yet.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {profile.education.map(edu => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: t.input, border: `1px solid ${t.border}`, borderRadius: 12, padding: 16 }}>
              <div><p style={{ color: t.text, fontWeight: 600, margin: 0 }}>{edu.degree}</p><p style={{ color: t.dim, fontSize: 13, margin: "4px 0 0" }}>{edu.school} · {edu.year}</p></div>
              <button onClick={() => setProfile({ ...profile, education: profile.education.filter(e => e.id !== edu.id) })} style={{ background: "none", border: "none", color: t.dim, cursor: "pointer", fontSize: 18 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16 }}>🛠️ Skills</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill (e.g. React, Python)"
            onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] }); setNewSkill(""); } }}
            style={{ flex: 1, background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "10px 16px", color: t.text, outline: "none", fontSize: 14 }} />
          <button onClick={() => { if (newSkill.trim()) { setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] }); setNewSkill(""); } }}
            style={{ background: "#6C63FF", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>Add</button>
        </div>
        {profile.skills.length === 0 && <p style={{ color: t.dim, fontSize: 14 }}>No skills added yet. Add at least 3 to boost your profile.</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {profile.skills.map((skill, i) => (
            <span key={i} style={{ background: "rgba(108,99,255,0.1)", color: "#A5A0FF", border: "1px solid rgba(108,99,255,0.2)", padding: "6px 14px", borderRadius: 20, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
              {skill}
              <button onClick={() => setProfile({ ...profile, skills: profile.skills.filter((_, idx) => idx !== i) })} style={{ background: "none", border: "none", color: t.dim, cursor: "pointer", fontSize: 11 }}>✕</button>
            </span>
          ))}
        </div>
      </div>

      {/* Resume Upload */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 16 }}>📄 Resume</h3>
        {profile.resumeUploaded ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>✅</span>
              <div><p style={{ color: "#10B981", fontWeight: 600, margin: 0 }}>Resume uploaded successfully!</p><p style={{ color: t.dim, fontSize: 12, margin: "2px 0 0" }}>You can update it anytime.</p></div>
            </div>
            <button onClick={() => setProfile({ ...profile, resumeUploaded: false })} style={{ background: "none", border: "none", color: t.dim, cursor: "pointer", fontSize: 13 }}>Remove</button>
          </div>
        ) : (
          <div onClick={() => setProfile({ ...profile, resumeUploaded: true })} style={{ border: `2px dashed ${t.border2}`, borderRadius: 12, padding: 40, textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.5 }}>📎</div>
            <p style={{ color: t.muted, fontSize: 14 }}>Click here to upload your resume (PDF, DOC)</p>
          </div>
        )}
      </div>
    </div>
  );

  // ===== MAIN RENDER =====
  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", color: t.text, fontFamily: "Arial, Helvetica, sans-serif" }}>

      {/* Sidebar */}
      <aside style={{ width: 260, borderRight: `1px solid ${t.border}`, background: t.bgSec, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: 24, borderBottom: `1px solid ${t.border}` }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <Image src="/logo.png" alt="JobsIn360" width={40} height={40} style={{ objectFit: "contain" }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: t.text }}>JobsIn360</span>
          </Link>
        </div>
        <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.dim, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1, paddingLeft: 8 }}>Menu</div>
          <SidebarItem id="dashboard" icon="🏠" label="Dashboard" />
          <SidebarItem id="search" icon="🔍" label="Search Jobs" />
          <SidebarItem id="resume" icon="📄" label="My Resume" />
          <SidebarItem id="saved" icon="📌" label="Saved Jobs" />
          <div style={{ fontSize: 11, fontWeight: 700, color: t.dim, marginBottom: 12, marginTop: 32, textTransform: "uppercase", letterSpacing: 1, paddingLeft: 8 }}>Settings</div>
          <SidebarItem id="profile" icon="👤" label="My Profile" />
          <SidebarItem id="host" icon="👑" label="Host Panel" requiresHost />
        </div>
        <div style={{ padding: 16, borderTop: `1px solid ${t.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, background: t.card, borderRadius: 12, border: `1px solid ${t.border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #6C63FF, #DB2777)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>U</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: t.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>User Account</p>
              <p style={{ fontSize: 12, color: t.dim, margin: 0 }}>{isHost ? "Host Admin" : "Standard User"}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
        {/* Top Header */}
        <header style={{ height: 72, borderBottom: `1px solid ${t.border}`, background: t.nav, backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, textTransform: "capitalize" }}>
            {activeTab === "host" ? "Host Panel" : activeTab.replace("-", " ")}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${t.border}`, background: t.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18 }} title="Toggle Theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            {/* Host Toggle */}
            <div onClick={() => { setIsHost(!isHost); if (isHost && activeTab === "host") setActiveTab("dashboard"); }}
              style={{ display: "flex", alignItems: "center", gap: 10, background: t.card, border: `1px solid ${t.border}`, padding: "8px 16px", borderRadius: 12, cursor: "pointer", userSelect: "none" }}>
              <div style={{ width: 40, height: 22, borderRadius: 11, background: isHost ? "#6C63FF" : t.hover, position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: isHost ? 20 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: t.textSec }}>Host Mode</span>
            </div>
            <button style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${t.border}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.muted, fontSize: 18 }}>🔔</button>
            <button onClick={() => router.push("/login")} style={{ fontSize: 13, color: t.muted, border: `1px solid ${t.border}`, padding: "8px 16px", borderRadius: 12, background: "transparent", cursor: "pointer" }}>Logout</button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "host" && renderHostPanel()}
            {activeTab === "profile" && renderProfile()}

            {["search", "resume", "saved"].includes(activeTab) && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", textAlign: "center", border: `2px dashed ${t.border}`, borderRadius: 16 }}>
                <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.5 }}>🚧</div>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textTransform: "capitalize" }}>{activeTab.replace("-", " ")}</h2>
                <p style={{ color: t.dim }}>This section is currently under construction.</p>
                {activeTab === "resume" && (
                  <button onClick={() => router.push("/resume")} style={{ marginTop: 16, background: "#6C63FF", color: "#fff", padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600 }}>Go to Resume Hub</button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: t.overlay, backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setIsAddUserModalOpen(false)}>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: 24, borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>Add New User</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
            <form onSubmit={handleAddUser} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 6 }}>Full Name</label>
                <input type="text" value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })} placeholder="e.g. Jane Doe" required
                  style={{ width: "100%", background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "12px 16px", color: t.text, outline: "none", fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 6 }}>Email Address</label>
                <input type="email" value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="jane@example.com" required
                  style={{ width: "100%", background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "12px 16px", color: t.text, outline: "none", fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 6 }}>Assign Role</label>
                <select value={newUserForm.role} onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  style={{ width: "100%", background: t.input, border: `1px solid ${t.border2}`, borderRadius: 12, padding: "12px 16px", color: t.text, outline: "none", fontSize: 14, boxSizing: "border-box" }}>
                  <option value="Candidate">Candidate</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Host">Host Admin</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: t.muted, marginBottom: 10 }}>Permissions</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ALL_PERMISSIONS.map(p => (
                    <button key={p.key} type="button" onClick={() => togglePermission(p.key, "form")} style={{
                      padding: "8px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid",
                      background: newUserForm.permissions.includes(p.key) ? "rgba(108,99,255,0.15)" : "transparent",
                      color: newUserForm.permissions.includes(p.key) ? "#6C63FF" : t.dim,
                      borderColor: newUserForm.permissions.includes(p.key) ? "rgba(108,99,255,0.3)" : t.border,
                    }}>{p.icon} {p.label}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setIsAddUserModalOpen(false)} style={{ flex: 1, border: `1px solid ${t.border2}`, color: t.text, padding: "12px", borderRadius: 12, background: "transparent", cursor: "pointer", fontWeight: 500 }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: "linear-gradient(135deg, #6C63FF, #DB2777)", color: "#fff", padding: "12px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600 }}>Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}