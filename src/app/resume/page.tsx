"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ResumeHubPage() {
  const router = useRouter();

  const tabs = [
    { id: "video", title: "Video Resume", icon: "📹", desc: "Stand out with a personal video intro", path: "/resume/video" },
    { id: "templates", title: "Template Builder", icon: "🎨", desc: "Use or create stunning layouts", path: "/resume/templates" },
    { id: "classic", title: "Classic Builder", icon: "📝", desc: "Step-by-step easy resume maker", path: "/resume/classic" },
  ];

  return (
    <div className="resume-page" style={{ fontFamily: "'Syne', sans-serif", background: "#080C18", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        .resume-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: linear-gradient(135deg, #6C63FF, #DB2777); color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Syne', sans-serif; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(108,99,255,0.4); }
        .btn-outline { background: transparent; color: #fff; border: 1.5px solid #374151; padding: 13px 28px; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; }
        .btn-outline:hover { border-color: #6C63FF; color: #6C63FF; }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(108,99,255,0.2); }
        .shimmer-text { background: linear-gradient(90deg, #6C63FF, #DB2777, #F59E0B, #6C63FF); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
        .mesh-bg { position: fixed; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(219,39,119,0.08) 0%, transparent 50%); pointer-events: none; z-index: 0; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, padding: "16px 40px",
        background: "rgba(8,12,24,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="JobsIn360" width={48} height={48} style={{ objectFit: "contain" }} />
        </Link>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={() => router.push("/login")} className="btn-outline" style={{ padding: "10px 22px", fontSize: 14 }}>Login</button>
          <button onClick={() => router.push("/signup")} className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>Get Started Free</button>
        </div>
      </nav>

      <div className="mesh-bg" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Craft Your <span className="shimmer-text">Perfect Story</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 18, fontFamily: "'DM Sans', sans-serif", maxWidth: 600, margin: "0 auto" }}>
            Choose the format that best represents you. From classic PDFs to modern video introductions.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className="card-hover"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1.5px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "32px", cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{tab.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{tab.title}</h3>
              <p style={{ color: "#9CA3AF", fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>{tab.desc}</p>
              <button className="btn-outline" style={{ width: "100%", padding: "10px", fontSize: 14 }}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}